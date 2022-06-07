import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="d-flex align-items-center flex-wrap">
        <div className="col-1">
          <i className="fas fa-bars fa-2xl"></i>
        </div>
        <div className="col-4">
          <h1>Sudokuller</h1>
        </div>
        <div>
          <i className="fas fa-user fa-2xl"></i>
        </div>
      </div>
    );
  }
}

Navbar.contextType = AppContext;
