# Sudokuller

A full stack web application for sudoku player to play sudoku.


## Technologies Used

- **React** and **Bootstrap** were use to build the front-end.
- The client communicates with the server using **fetch** requests
- **Node.js** and **Express** were use to set up the server
- Registration, Authentication, and Authorization were done using **Argon2** and **JSON Web Tokens**
- A **PostgreSQL** database was used to store the users and sudoku puzzles 

## Live Demo

Try the application live [Here](https://sudokuller.herokuapp.com)

## Features
#### Implemented

- Players can view the sudoku board.
- Players can input numbers onto the board.
- Players can erase a number.
- Players can undo moves.
- Players can toggle and input pencil marks.
- Players can pause the timer.
- Players can create and view their profile.

#### Future Features

- Players can create their own sudoku.
- Players can continue a previous game.

## Preview

![demo](https://user-images.githubusercontent.com/97194085/174348343-644e107d-de7d-4e15-8fe2-045865758d1b.gif)

### System Requirements

- Node.js
- PostgreSQL

### Set Up Instructions

1. Clone repository
2. Install all dependencies by running `npm i` or `npm install`
3. Create a copy of the **.env.example** file using `cp .env.example env.`
4. Change the values in `.env`
5. Create a database with the same name as in the `.env` file
6. Run `npm run db:import` to create the database and initialize its value
7. Run `npm run build` to compile the codes
8. Go to [localhost:3000](localhost:3000) to view the app
