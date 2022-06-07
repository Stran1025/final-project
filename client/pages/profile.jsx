import React from 'react';
import AppContext from '../lib/app-context';

export default class Profile extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 card">
            <h1 className="text-center">{'Hi! ' + 'Sang!'}</h1>
            <div className="d-flex">
              <div className="border">
                <h1>0</h1>
                <p>Completed</p>
              </div>
              <div className="border">
                <h1>Novice</h1>
                <p>Title</p>
              </div>
              <div className="border">
                <h1>0</h1>
                <p>Created</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.contextType = AppContext;
