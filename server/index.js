require('dotenv/config');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const argon2 = require('argon2');
const ClientError = require('./client-error');
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

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.get('/api/sudoku', (req, res, next) => {
  const sql = `
            select *
              from "sudokus"
             order by random()
            limit 1
  `;
  db.query(sql)
    .then(result => {
      const { challenge, sudokuId } = result.rows[0];
      res.json({ challenge, sudokuId });
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
