import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-light bg-white border border-top-0 border-start-0 border-end-0 mb-3'>
        <div className="container">
          <a href="#" className="navbar-brand">
            <i className='fas fa-bars fa-2xl me-2'></i>
            Sudokuller
          </a>
          <a href='#profile' className='navbar-brand'>
            <i className='fas fa-user fa-2xl'></i>
          </a>
        </div>
      </nav>
    );
  }
}

Navbar.contextType = AppContext;
