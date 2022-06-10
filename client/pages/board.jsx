import React from 'react';
import AppContext from '../lib/app-context';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimerPaused: false,
      timer: { minute: 0, second: 0, totalSecond: 0 },
      isPencil: false,
      error: null,
      success: null,
      previousMove: [],
      selected: null,
      solution: [],
      challenge: [],
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
    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.handleNumPadClick = this.handleNumPadClick.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.togglePencil = this.togglePencil.bind(this);
    this.handleEraser = this.handleEraser.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeErrorModal = this.closeErrorModal.bind(this);
  }

  componentDidMount() {
    fetch('/api/sudoku')
      .then(res => res.json())
      .then(data => {
        const { challenge, solution } = data;
        this.setState({ challenge, solution });
        this.timer = setInterval(this.handleTimer, 1000);
      })
      .catch(err => console.error('Error:', err));
  }

  handleSubmit() {
    const { challenge, timer, solution } = this.state;
    const token = this.context.token;
    let count = 0;
    challenge.flat().forEach((element, index) => {
      if (element === 0) {
        count++;
        this.setState({ error: 'Incomplete puzzle' });
        return;
      }
      const solutionArr = solution.flat();
      if (element !== solutionArr[index]) {
        count++;
        this.setState({ error: 'Incorrect solution' });

      }
    });
    if (count) {
      return;
    }
    fetch('/api/sudoku', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.context.token
      },
      body: JSON.stringify({ token, solution: challenge, timer })
    })
      .then(res => {

      })
      .catch(err => {
        console.error(err);
      });
  }

  toggleTimer() {
    if (this.state.isTimerPaused) {
      this.timer = setInterval(this.handleTimer, 1000);
    } else {
      clearInterval(this.timer);
    }
    this.setState({ isTimerPaused: !this.state.isTimerPaused });
  }

  handleTimer() {
    let totalSecond = this.state.timer.totalSecond;
    totalSecond++;
    const minute = Math.floor(totalSecond / 60);
    const second = totalSecond % 60;
    this.setState({ timer: { minute, second, totalSecond } });
  }

  handleBoardClick(event) {
    if (event.target.hasAttribute('data-timer')) {
      this.toggleTimer();
      return;
    }
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

  handleEraser() {
    const selected = this.state.selected;
    if (!selected) {
      return;
    }
    const { row, col } = selected;
    const challenge = this.state.challenge.slice();
    const previousMove = this.state.previousMove.concat([{
      challenge: this.state.challenge.map(row => row.map(value => {
        if (Array.isArray(value)) {
          value = value.map(pencil => pencil);
        }
        return value;
      })),
      selected
    }]);
    if (challenge[row][col] === 0) {
      return;
    }
    challenge[row][col] = 0;
    this.setState({ challenge, previousMove });
  }

  closeErrorModal() {
    this.setState({ error: null });
  }

  render() {
    const pencil = this.state.isPencil ? ' bg-primary' : ' ';
    let timerIcon = 'fa-circle-pause';
    let timer = 'd-none';
    if (this.state.isTimerPaused) {
      timer = 'd-flex';
      timerIcon = 'fa-circle-play';
    }
    const title = this.state.success ? 'Congratulation' : 'Error';
    const message = this.state.success ? this.state.success.message : this.state.error;
    const error = this.state.error ? 'd-flex' : 'd-none';
    return (
      <div className="container position-relative">
        <div className={'error-modal justify-content-center ' + error}>
          <div className='card w-25 h-50 align-self-center text-center'>
            <h2>{title}</h2>
            <p>{message}</p>
            <button className='btn btn-secondary w-50 m-auto' onClick={this.closeErrorModal}>Back</button>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-12 col-sm-12 col-lg-4 position-relative'>
            <p className='text-end'>
              <span>{this.state.timer.minute}</span>
              <span>:</span>
              <span className='me-1'>{this.state.timer.second}</span>
              <i className={'far ' + timerIcon} onClick={this.toggleTimer}></i>
            </p>
            <table className="table table-bordered sudoku-board" onClick={this.handleBoardClick}>
              <div className={'board-modal justify-content-center ' + timer} data-timer="timer">
                <i className='far fa-circle-play fa-2xl align-self-center' data-timer="timer"></i>
              </div>
              <tbody>
                {this.state.challenge.map((element, index) => {
                  return (
                    <tr key={index} data-row={index} className='table-light'>
                    {this.state.challenge[index].map((element, i) => {
                      let isIncorrect = ' ';
                      if (this.state.challenge[index][i] !== this.state.solution[index][i] && this.state.challenge[index][i] !== 0) {
                        isIncorrect = ' bg-danger';
                      }
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
                          <td key={i} data-col={i} className={this.state.layout[index][i] + isSelected + ' m-0 p-0 '}>
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
                      return (<td key={i} data-col={i} className={this.state.layout[index][i] + isSelected + isIncorrect}>{digit}</td>);
                    })}
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='col-12 col-sm-12 col-md-12 col-lg-1'></div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-3 col-xxl-3 text-center">
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
                  <i className='fas fa-eraser fa-2xl i' onClick={this.handleEraser}></i>
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
            <div className="row mt-3">
              <div className="col-12">
                <button className='btn btn-primary' onClick={this.handleSubmit}>Submit</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

Board.contextType = AppContext;
export default Board;
