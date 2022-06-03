import React from 'react';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPencil: false,
      previousMove: [],
      selected: null,
      challenge: this.props.challenge,
      layout: [
        ['top left cell', 'top cell', 'top cell', 'top left cell', 'top cell', 'top cell', 'top left cell', 'top cell', 'top right cell'],
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
    this.handleUndo = this.handleUndo.bind(this);
    this.togglePencil = this.togglePencil.bind(this);
  }

  handleClick(event) {
    const row = event.target.parentElement.getAttribute('data-row');
    const col = event.target.getAttribute('data-col');
    let val = this.state.challenge[row][col];
    if (Array.isArray(val)) {
      val = ' ';
      this.setState({ selected: { row, col, val } });
      return;
    }
    if (val === 0) {
      val = ' ';
    }
    this.setState({ selected: { row, col, val } });
  }

  handleNumPadClick(event) {
    const selected = this.state.selected;
    if (!selected) {
      return;
    }
    const { row, col } = selected;
    const number = parseInt(event.target.value);
    const challenge = this.state.challenge.slice();
    const previousMove = this.state.previousMove.concat([{
      challenge: challenge.map(row => row.map(value => {
        if (Array.isArray(value)) {
          value = value.map(pencil => pencil);
        }
        return value;
      })),
      selected
    }]);
    if (this.state.isPencil) {
      if (!Array.isArray(challenge[row][col])) {
        challenge[row][col] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      if (challenge[row][col][number - 1] === 0) {
        challenge[row][col][number - 1] = number;
      } else {
        challenge[row][col][number - 1] = 0;
      }
      this.setState({ challenge, previousMove });
      return;
    }
    challenge[row][col] = number;
    this.setState({ challenge, selected: null, previousMove });
  }

  handleUndo() {
    const previousMove = this.state.previousMove.slice();
    if (!previousMove.length) {
      return;
    }
    const { challenge, selected } = previousMove.pop();
    this.setState({ challenge, selected, previousMove });
  }

  togglePencil() {
    this.setState({ isPencil: !this.state.isPencil });
  }

  render() {
    let pencil = '';
    if (this.state.isPencil) {
      pencil = ' bg-primary';
    }
    return (
      <div className='row'>
        <div className='col-12 col-sm-12 col-lg-4'>
          <table className="table table-bordered sudoku-board" onClick={this.handleClick}>
            <tbody>
              {this.state.challenge.map((element, index) => {
                return (
                  <tr key={index} data-row={index} className='table-light'>
                  {this.state.challenge[index].map((element, i) => {
                    let digit = this.state.challenge[index][i];
                    if (!digit) {
                      digit = ' ';
                    }
                    let isSelected = ' ';
                    if (this.state.selected && parseInt(this.state.selected.row) === index && parseInt(this.state.selected.col) === i) {
                      isSelected = ' bg-warning ';
                    }
                    if (Array.isArray(digit)) {
                      return (
                        <td key={i} data-col={i} className={this.state.layout[index][i] + isSelected + 'm-0 p-0 '}>
                          <div className='d-inline-flex flex-wrap align-middle' data-row={index}>
                            {digit.map((ele, key) => {
                              let value = digit[key];
                              if (!value) {
                                value = '  ';
                              }
                              return (
                                <span key={key} className='small-font m-0 ' data-col={i}>{value}</span>
                              );
                            })}
                          </div>
                        </td>
                      );
                    }
                    return (<td key={i} data-col={i} className={this.state.layout[index][i] + isSelected}>{digit}</td>);
                  })}
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='col-12 col-sm-12 col-md-12 col-lg-1'></div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-3 col-xxl-2 text-center">
          <div className='row m-2 justify-content-center'>
            <div className='col-2 col-sm-1 col-md-1 col-lg-3 col-xl-3 col-xxl-3'>
              <div className='i-wrapper'>
                <i className='fas fa-rotate-left fa-2xl i' onClick={this.handleUndo}></i>
              </div>
            </div>
            <div className='col-2 col-sm-1 col-md-1 col-lg-3 col-xl-3 col-xxl-3'>
              <div className={'i-wrapper' + pencil}>
                <i className='fas fa-pencil fa-2xl i' onClick={this.togglePencil}></i>
              </div>
            </div>
            <div className='col-2 col-sm-1 col-md-1 col-lg-3 col-xl-3 col-xxl-3'>
              <div className='i-wrapper'>
                <i className='fas fa-eraser fa-2xl i'></i>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='numpad col-12' onClick={this.handleNumPadClick}>
              <button className='num p-2 m-1' value={1}>1</button>
              <button className='num p-2 m-1' value={2}>2</button>
              <button className='num p-2 m-1' value={3}>3</button>
              <button className='num p-2 m-1' value={4}>4</button>
              <button className='num p-2 m-1' value={5}>5</button>
              <button className='num p-2 m-1' value={6}>6</button>
              <button className='num p-2 m-1' value={7}>7</button>
              <button className='num p-2 m-1' value={8}>8</button>
              <button className='num p-2 m-1' value={9}>9</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Board;
