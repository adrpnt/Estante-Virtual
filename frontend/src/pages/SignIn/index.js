import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '../../services/api';
import { login } from '../../services/auth';

import Logo from '../../assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
});

class SignIn extends Component {
  state = {
    error: '',
  };

  handleSignIn = async (data) => {
    try {
      const { history } = this.props;
      const response = await api.post('/sessions', data);

      login(response.data.token);
      history.push('/home');
    } catch (err) {
      this.setState({
        error: 'An error occurred while trying to login, check your credentials.',
      });
    }
  };

  render() {
    const { error } = this.state;

    return (
      <div className="container-form">
        <Form schema={schema} onSubmit={this.handleSignIn}>
          <img src={Logo} alt="Estante Virtual Logo" />

          {error && <p>{error}</p>}

          <Input name="email" placeholder="E-mail" />
          <Input name="password" placeholder="Password" type="password" />

          <button type="submit">Login</button>
          <hr />

          <Link to="/signup">Register</Link>
        </Form>
      </div>
    );
  }
}

export default withRouter(SignIn);
