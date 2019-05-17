import React, { Component } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';

import './styles.css';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    error: '',
  };

  handleSignUp = (event) => {
    event.preventDefault();
    alert('Eu vou te registrar');
  };

  render() {
    const { error } = this.state;

    return (
      <div className="container">
        <Form onSubmit={this.handleSignUp}>
          {error && <p>{error}</p>}

          <input
            type="text"
            placeholder="Name"
            onChange={event => this.setState({ name: event.target.value })}
          />

          <input
            type="email"
            placeholder="E-mail"
            onChange={event => this.setState({ email: event.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={event => this.setState({ password: event.target.value })}
          />

          <button type="submit">Register</button>
          <hr />

          <Link to="/">Login</Link>
        </Form>
      </div>
    );
  }
}

export default SignUp;
