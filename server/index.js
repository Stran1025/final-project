require('dotenv/config');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const argon2 = require('argon2');
const ClientError = require('./client-error');
const authorizationMiddleware = require('./token-verify-middleware');
const jwt = require('jsonwebtoken');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(express.static(publicPath));

app.get('/api/sudoku', (req, res, next) => {
  const sql = `
            select *
              from "sudokus"
             where "points" = '300'
            limit 1
  `;
  db.query(sql)
    .then(result => {
      const { challenge, solution, points, sudokuId } = result.rows[0];
      res.json({ challenge, sudokuId, solution, points });
    })
    .catch(err => next(err));
});

app.use(express.json());

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password, firstname, lastname } = req.body;
  if (!username && !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  const usersCheck = `
        select *
        from "users"
        where "username" = $1
  `;
  db.query(usersCheck, [username])
    .then(result => {
      if (result.rows[0]) {
        throw new ClientError(400, 'username is taken');
      }
    })
    .catch(err => next(err));
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
          insert into "users" ("username", "hashedPassword", "firstName", "lastName")
          values ($1, $2, $3, $4)
          returning "userId", "username", "createdAt"
      `;
      return db.query(sql, [username, hashedPassword, firstname, lastname]);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'username and password are require');
  }
  const sql = `
      select "userId", "hashedPassword"
        from "users"
       where "username" = $1
  `;
  db.query(sql, [username])
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'Invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'Invalid Password');
          }
          const token = jwt.sign({ userId, username }, process.env.TOKEN_SECRET);
          res.json({ token, user: { userId, username } });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/api/profile', (req, res, next) => {
  const sql = `
    select "firstName"
      from "users"
      where "userId" = $1;
  `;
  db.query(sql, [req.user.userId])
    .then(result => {
      const [user] = result.rows;
      const completedSql = `
        select count("solutionId") as "completed", sum("points") as "experience"
          from "solutions"
          where "userId" = $1 and "isFinished" = true;
      `;
      db.query(completedSql, [req.user.userId])
        .then(result => {
          user.exp = result.rows[0].experience;
          user.completed = result.rows[0].completed;
          const createdSql = `
            select count("sudokuId") as "created"
            from "sudokus"
            where "userId" = $1
          `;
          db.query(createdSql, [req.user.userId])
            .then(result => {
              user.created = result.rows[0].created;
              res.json(user);
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/solution', (req, res, next) => {
  const sql = `
    insert into "solutions" ("userId", "sudokuId", "time", "isFinished", "points")
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  const { sudokuId, timer, points } = req.body;
  db.query(sql, [req.user.userId, sudokuId, timer.totalSecond, true, points])
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
