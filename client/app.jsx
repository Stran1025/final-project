import React from 'react';
// import Board from './components/board';
import 'bootstrap/dist/css/bootstrap.css';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import Auth from './pages/auth';
import Navbar from './components/navbar';
import Home from './pages/home';
import Profile from './pages/profile';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash),
      sudoku: null
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    fetch('/api/sudoku')
      .then(res => res.json())
      .then(data => {
        this.setState({ sudoku: data.challenge });
      })
      .catch(err => console.error('Error:', err));
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('sudoku-token');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('sudoku-token', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('sudoku-token');
    this.setState({ user: null });
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
    return (<h1>Not Found</h1>);
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const token = window.localStorage.getItem('sudoku-token');
    const { user, route, sudoku } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut, sudoku, token };
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
