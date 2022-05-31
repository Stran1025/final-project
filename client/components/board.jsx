import React from 'react';

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      challenge: this.props.challenge
    };
  }

  render() {
    return (
    <table className="table table-bordered sudoku-board">
      <tbody>
        {this.state.challenge.map((element, index) => {
          return (
          <tr key={index} className='table-light'>
            {this.state.challenge[index].map((element, i) => {
              return (<td key={i} className=''>{this.state.challenge[index][i]}</td>);
            })}
          </tr>
          );
        })}
      </tbody>
    </table>
    );
  }
}

export default Board;
