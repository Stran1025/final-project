import React from 'react';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const val = '';
    this.setState({ selected: { row, col, val } });
  }

  handleNumPadClick(event) {
    const { row, col } = this.state.selected;
    const input = this.state.challenge;
    input[row][col] = event.target.value;
    this.setState({ challenge: input, selected: null });
  }

  render() {
    return (
      <div className='row'>
        <div className='col-12 col-lg-3'>
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
        <div className='col-lg-2'></div>
        <div className="col-12 col-sm-12 col-lg-3 numpad d-flex justify-content-center" onClick={this.handleNumPadClick}>
          <button className='num' value={1}>1</button>
          <button className='num' value={2}>2</button>
          <button className='num' value={3}>3</button>
          <button className='num' value={4}>4</button>
          <button className='num' value={5}>5</button>
          <button className='num' value={6}>6</button>
          <button className='num' value={7}>7</button>
          <button className='num' value={8}>8</button>
          <button className='num' value={9}>9</button>
        </div>

      </div>
    );
  }
}

export default Board;
