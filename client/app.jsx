import React from 'react';
import Board from './components/board';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    return <Board />;
  }
}
