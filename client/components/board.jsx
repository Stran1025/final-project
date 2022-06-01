import React from 'react';

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      challenge: this.props.challenge,
      layout: [['top left cell', 'top cell', 'top cell', 'top left cell', 'top cell', 'top cell', 'top left cell', 'top cell', 'top right cell'],
        ['left cell', 'cell', 'cell', 'left cell', 'cell', 'cell', 'left cell', 'cell', 'right cell'],
        ['left cell', 'cell', 'cell', 'left cell', 'cell', 'cell', 'left cell', 'cell', 'right cell'],
        ['top left cell', 'top cell', 'top cell', 'top left cell', 'top cell', 'top cell', 'top left cell', 'top cell', 'top right cell'],
        ['left cell', 'cell', 'cell', 'left cell', 'cell', 'cell', 'left cell', 'cell', 'right cell'],
        ['left cell', 'cell', 'cell', 'left cell', 'cell', 'cell', 'left cell', 'cell', 'right cell'],
        ['top left cell', 'top cell', 'top cell', 'top left cell', 'top cell', 'top cell', 'top left cell', 'top cell', 'top right cell'],
        ['left cell', 'cell', 'cell', 'left cell', 'cell', 'cell', 'left cell', 'cell', 'right cell'],
        ['bottom left cell', 'bottom cell', 'bottom cell', 'bottom left cell', 'bottom cell', 'bottom cell', 'bottom left cell', 'bottom cell', 'bottom right cell']]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
  }

  render() {
    return (
    <table className="table table-bordered sudoku-board" onClick={this.handleClick}>
      <tbody>
        {this.state.challenge.map((element, index) => {
          return (
          <tr key={index} className='table-light'>
            {this.state.challenge[index].map((element, i) => {
              if (this.state.challenge[index][i]) {
                return (<td key={i} className={this.state.layout[index][i]}>{this.state.challenge[index][i]}</td>);
              }
              return (<td key={i} className={this.state.layout[index][i]}></td>);
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
