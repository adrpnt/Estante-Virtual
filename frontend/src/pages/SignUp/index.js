import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '../../services/api';

import './styles.scss';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required(),
});

class SignUp extends Component {
  state = {
    error: '',
  };

  handleSignUp = async (user) => {
    try {
      const { history } = this.props;

      await api.post('/users', user);
      history.push('/');
    } catch (err) {
      this.setState({ error: 'An error occurred while trying to register your account. T.T' });
    }
  };

  render() {
    const { error } = this.state;

    return (
      <div className="container">
        <Form className="signup-form" schema={schema} onSubmit={this.handleSignUp}>
          {error && <p>{error}</p>}

          <Input name="name" placeholder="Name" />
          <Input name="email" placeholder="E-mail" />
          <Input name="password" placeholder="Password" type="password" />

          <button type="submit">Register</button>
          <hr />

          <Link to="/">Login</Link>
        </Form>
      </div>
    );
  }
}

export default withRouter(SignUp);
