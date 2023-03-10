import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import getQuestions from '../services/questionsAPI';
import { startGame } from '../redux/actions';

class Game extends Component {
  state = {
    questions: [],
    loading: true,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(startGame(0));
    await this.getStorage();
  }

  getStorage = async () => {
    const token = localStorage.getItem('token');

    const data = await getQuestions(token);
    const { response_code: response } = data;
    const number = 3;
    if (response === number) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({ questions: data.results, loading: false });
  };

  render() {
    const { questions, loading } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Header />
        {
          loading
            ? <p>Carregando</p>
            : <Questions questions={ questions } history={ history } />
        }

      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
