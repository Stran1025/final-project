import React from 'react';
import Board from './components/board';
import NumPad from './components/numpad';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sudoku: null,
      highlightedCell: null
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
      <div className='row'>
        <Board challenge={this.state.sudoku}/>
        <NumPad />
      </div>
    );
  }
}
