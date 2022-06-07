import React from 'react';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  render() {
    return (
        <div className='container'>
          <div className='row half-height'></div>
          <div className="row">
            <div className="col-12 text-center align-middle">
              <button className="btn btn-info">New Game</button>
            </div>
          </div>
        </div>
    );
  }
}

Home.contextType = AppContext;
