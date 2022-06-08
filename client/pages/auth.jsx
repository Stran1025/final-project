import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  componentDidMount() {
    this.context = AppContext;
  }

  render() {
    const { token, route, handleSignIn } = this.context;

    if (token) return <Redirect to="" />;

    const welcomeMessage = route.path === 'sign-in'
      ? 'Please sign in to continue'
      : 'Create an account to get started!';
    return (
      <div className="row pt-5 align-items-center">
        <div className="card col-10 m-auto offset-0 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
          <header className="w-100 text-center border border-top-0 border-start-0 border-end-0 mt-3">
            <h2 className="">
              <i className="fas fa-bolt me-2" />
              Sudokuller
            </h2>
            <p className="text-muted mb-4">{welcomeMessage}</p>
          </header>
          <div className="p-3 ">
            <AuthForm
              key={route.path}
              action={route.path}
              onSignIn={handleSignIn} />
          </div>
        </div>
      </div>
    );
  }
}

AuthPage.contextType = AppContext;
