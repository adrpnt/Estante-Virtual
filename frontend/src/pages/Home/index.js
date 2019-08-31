import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; // Link

import api from '../../services/api';
import { logout } from '../../services/auth';

import Logo from '../../assets/logo.svg';

class Home extends Component {
  state = {
    books: JSON.parse(localStorage.getItem('books')) || [],
    error: '',
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = async () => {
    const response = await api.get('/books');

    this.setState({ books: response.data });
  };

  handleLogout = () => {
    const { history } = this.props;

    logout();
    history.push('/');
  };

  render() {
    const { books, error } = this.state;

    return (
      <div className="container">
        <img src={Logo} alt="Estante Virtual Logo" />
        <h1>Estante Virtual</h1>
        {error && <p>{error}</p>}

        <button type="button" onClick={this.handleLogout}>
          Logout
        </button>

        <section className="books">
          {books.map(book => (
            <div className="book" key={book.id}>
              <button type="button" className="remove">
                X
              </button>
              <strong>{book.title}</strong>
              <small>{book.author}</small>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default withRouter(Home);
