import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './components/Question'
import Quiz from './components/Quiz'
import quizQuestions from './api/quizQuestions';
import Result from './components/Results';
interface IProps {
}
interface IState{
  counter: number,
  questionId: number,
  question: string,
  answerOptions: object[],
  answer: string,
  answersCount: object,
  result: string
}
class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      result: ''
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentDidMount() {
    // Shuffle the answers to each question
    const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));

    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }
  shuffleArray(array: object[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  setUserAnswer(answer:string) {
    this.setState((state) => ({
      answersCount: {
        ...state.answersCount,
        // [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }
  
  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  handleAnswerSelected(event:Event) {
    console.log("Handle answer called")
    const target = event.target as HTMLTextAreaElement;

    this.setUserAnswer(target.value);
    if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
      } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
      }
  }
  setResults (result:string[]) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }
  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    // const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    // const maxAnswerCount = Math.max.apply(null, answersCountValues);
    return ["Passed"]
    // return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }
  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        counter={this.state.counter}
        questionId={this.state.questionId}
        question={this.state.question}
        disabled={false}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }
  
  renderResult() {
    return (
      <Result quizResult={this.state.result} />
    );
  }
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }

}

export default App;
