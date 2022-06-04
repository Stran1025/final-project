require('dotenv/config');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');

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

app.post('/api/sign-up', (req, res, next) => {

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
