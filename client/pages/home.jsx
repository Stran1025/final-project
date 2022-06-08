import React from 'react';
import AppContext from '../lib/app-context';
import Board from '../components/board';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getGame = this.getGame.bind(this);
  }

  getGame() {

  }

  render() {
    return (
        <div className='container'>
          <Board challenge={this.context.sudoku}/>
          {/* <div className='row half-height'></div>
          <div className="row">
            <div className="col-12 text-center align-middle">
              <button className="btn btn-info" onClick={this.getGame}>New Game</button>
            </div>
          </div> */}
        </div>
    );
  }
}

Home.contextType = AppContext;
