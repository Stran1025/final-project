import React from 'react';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousMove: [],
      selected: null,
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
    this.handleNumPadClick = this.handleNumPadClick.bind(this);
  }

  handleClick(event) {
    const row = event.target.parentElement.getAttribute('data-row');
    const col = event.target.getAttribute('data-col');
    let val = this.state.challenge[row][col];
    if (val === 0) {
      val = ' ';
    }
    this.setState({ selected: { row, col, val } });
  }

  handleNumPadClick(event) {
    if (!this.state.selected) {
      return;
    }
    const { row, col } = this.state.selected;
    const input = this.state.challenge;
    input[row][col] = event.target.value;
    this.setState({ challenge: input, selected: null });
  }

  render() {
    return (
      <div className='row'>
        <div className='col-12 col-sm-12 col-lg-4'>
          <table className="table table-bordered sudoku-board" onClick={this.handleClick}>
            <tbody>
              {this.state.challenge.map((element, index) => {
                return (
                  <tr key={index} data-row={index} className='table-light'>
                  {this.state.challenge[index].map((element, i) => {
                    if (this.state.selected && parseInt(this.state.selected.row) === index && parseInt(this.state.selected.col) === i) {
                      return (<td key={i} data-col={i} className={'bg-warning ' + this.state.layout[index][i]}>{this.state.selected.val}</td>);
                    }
                    if (this.state.challenge[index][i]) {
                      return (<td key={i} data-col={i} className={this.state.layout[index][i]}>{this.state.challenge[index][i]}</td>);
                    }
                    return (<td key={i} data-col={i} className={this.state.layout[index][i]}></td>);
                  })}
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='col-12 col-sm-12 col-lg-1'></div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-2 text-center">
          <div className='row'>
            <div className='col-4'>
              <i className='fas fa-pen'></i>
            </div>
          </div>
          <div className='row'>
            <div className='numpad' onClick={this.handleNumPadClick}>
              <button className='num p-2' value={1}>1</button>
              <button className='num p-2' value={2}>2</button>
              <button className='num p-2' value={3}>3</button>
              <button className='num p-2' value={4}>4</button>
              <button className='num p-2' value={5}>5</button>
              <button className='num p-2' value={6}>6</button>
              <button className='num p-2' value={7}>7</button>
              <button className='num p-2' value={8}>8</button>
              <button className='num p-2' value={9}>9</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Board;
