import React from 'react';

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      challenge: [[0, 0, 5, 3, 0, 0, 0, 7, 0], [0, 9, 0, 0, 0, 4, 3, 1, 0], [8, 0, 0, 7, 9, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 3, 1], [7, 8, 0, 0, 0, 2, 0, 4, 0], [0, 0, 0, 0, 5, 0, 0, 0, 0], [9, 0, 0, 0, 0, 0, 0, 2, 8], [0, 0, 3, 0, 0, 0, 0, 0, 0], [5, 1, 0, 0, 0, 0, 0, 0, 0]]
    };
  }

  render() {
    return (
    <table className="table table-bordered">
      <tbody>
        {this.state.challenge.map((element, index) => {
          return (
          <tr key={index}>
            {this.state.challenge[index].map((element, i) => {
              return (<td key={i} className="">{this.state.challenge[index][i]}</td>);
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
