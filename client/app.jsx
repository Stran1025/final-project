import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import Auth from './pages/auth';
import Navbar from './components/navbar';
import Home from './pages/home';
import Profile from './pages/profile';
import Board from './pages/board';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorizing: true,
      route: parseRoute(window.location.hash),
      token: null
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('sudoku-token');
    this.setState({ isAuthorizing: false, token });
  }

  handleNewGame() {

  }

  handleSignIn(result) {
    const { token } = result;
    window.localStorage.setItem('sudoku-token', token);
    this.setState({ token });
  }

  handleSignOut() {
    window.localStorage.removeItem('sudoku-token');
    this.setState({ token: null });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home/>;
    }
    if (path === 'sign-in' || path === 'sign-up') {
      return <Auth/>;
    }
    if (path === 'profile') {
      return <Profile/>;
    }
    if (path === 'board') {
      return <Board/>;
    }
    return (<h1>Not Found</h1>);
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { route, token } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { route, handleSignIn, handleSignOut, token };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Navbar/>
          {this.renderPage()}
        </>
      </AppContext.Provider>
    );
  }
}
