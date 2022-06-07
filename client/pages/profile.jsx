import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      created: 0,
      completed: 0,
      style: {
        width: '10%'
      }
    };
  }

  componentDidMount() {
    fetch('/api/profile', {
      headers: {
        'x-access-token': this.context.token
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState(result);
      });
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in"/>;
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 col-sm-10 sol-md-8 col-lg-6 col-xxl-6 card half-height m-auto">
            <h1 className="text-center mt-3">{'Hi! ' + this.state.firstName}</h1>
            <div className="d-flex justify-content-evenly mt-3">
              <div className="border info-box text-center d-flex align-items-center justify-content-center">
                <p className='fs-4 fw-bold'>{this.state.completed}<br></br><span className='fw-normal fs-6'>Completed</span></p>
              </div>
              <div className="border info-box text-center d-flex align-items-center justify-content-center">
                <p className='fs-4 fw-bold'>Novice<br></br><span className='fw-normal fs-6'>Title</span></p>
              </div>
              <div className="border info-box text-center d-flex align-items-center justify-content-center">
                <p className='fs-4 fw-bold'>{this.state.created}<br></br><span className='fw-normal fs-6'>Created</span></p>
              </div>
            </div>
            <div className='mb-3'>
              <p>{'Level: ' + '1'}</p>
              <div className="progress">
                <div className="progress-bar" style={this.state.style} aria-valuenow={0} aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.contextType = AppContext;
