import React from 'react';
import Board from './components/board';
import 'bootstrap/dist/css/bootstrap.css';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import Auth from './pages/auth';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash),
      sudoku: null
    };
  }

  componentDidMount() {
    fetch('/api/sudoku')
      .then(res => res.json())
      .then(data => {
        this.setState({ sudoku: data.challenge });
      })
      .catch(err => console.error('Error:', err));
  }

  render() {
    if (!this.state.sudoku) {
      return (<h1>Hi</h1>);
    }
    return (
      <Board challenge={this.state.sudoku}/>
    );
  }
}
