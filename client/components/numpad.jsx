import React from 'react';

class NumPad extends React.Component {
  render() {
    return (
      <div className="col-12 col-sm-12 col-lg-3 numpad">
        <button className='num'>1</button>
        <button className='num'>2</button>
        <button className='num'>3</button>
        <button className='num'>4</button>
        <button className='num'>5</button>
        <button className='num'>6</button>
        <button className='num'>7</button>
        <button className='num'>8</button>
        <button className='num'>9</button>
      </div>
    );
  }
}

export default NumPad;
