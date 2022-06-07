import React from 'react';
import AppContext from '../lib/app-context';

export default class Profile extends React.Component {
  render() {
    const style = {
      width: '35%'
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 card half-height">
            <h1 className="text-center">{'Hi! ' + 'Sang!'}</h1>
            <div className="d-flex justify-content-evenly mt-3">
              <div className="border info-box text-center d-flex align-items-center justify-content-center">
                <p className='fs-4 fw-bold'>0<br></br><span className='fw-normal fs-6'>Completed</span></p>
              </div>
              <div className="border info-box text-center d-flex align-items-center justify-content-center">
                <p className='fs-4 fw-bold'>Novice<br></br><span className='fw-normal fs-6'>Title</span></p>
              </div>
              <div className="border info-box text-center d-flex align-items-center justify-content-center">
                <p className='fs-4 fw-bold'>0<br></br><span className='fw-normal fs-6'>Created</span></p>
              </div>
            </div>
            <div className='mb-3'>
              <p>{'Level: ' + '1'}</p>
              <div className="progress">
                <div className="progress-bar" style={style} aria-valuenow={0} aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.contextType = AppContext;
