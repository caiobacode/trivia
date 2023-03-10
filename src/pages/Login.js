import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getTriviaAPI from '../services/triviaAPI';
import { submitUserEmail, submitUserName } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.handleCheck();
    });
  };

  handleCheck = () => {
    const { name, email } = this.state;
    if (name !== '' && email !== '') {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleClick = async () => {
    const { dispatch, history } = this.props;
    const { email, name } = this.state;
    dispatch(submitUserEmail(email));
    dispatch(submitUserName(name));
    const api = await getTriviaAPI();
    localStorage.setItem('token', api.token);
    history.push('/game');
  };

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div className="main">
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            name="name"
            onChange={ this.handleChange }
            value={ name }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          disabled={ isDisabled }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClickSettings }
        >
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
