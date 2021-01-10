import  { Component } from 'react';

import './App.css';
import Quiz from './components/Quiz'
import quizQuestions from './api/quizQuestions';
import Result from './components/Results';
interface IProps {
}
interface IState{
  questionId: number,
  question: string,
  answerOptions: object[],
  answer: string,
  correctAnswers:number,
  result: string
}
class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      questionId: 0,
      question: '',
      answerOptions: [],
      correctAnswers: 0,
      answer: '',
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


  
  setNextQuestion() {
 
    const questionId = this.state.questionId + 1;
    this.setState({
      questionId: questionId,
      question: quizQuestions[questionId].question,
      answerOptions: quizQuestions[questionId].answers,
      answer: ''
    });
  }
  setUserAnswer(answer:string) {
    this.setState(() => ({
      answer: answer
    }));
  }

  handleAnswerSelected(event:Event) {

    const target = event.target as HTMLTextAreaElement;
    console.log(target.value + " selected")
    if (target.value === "correct"){
      this.setState((prevState) => ({
        correctAnswers: prevState.correctAnswers +1
      }));
    }
    this.setUserAnswer(target.value);

    if (this.state.questionId + 1 < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
      } else {
        setTimeout(() => this.getResults(), 300);
      }
  }

  getResults() {
    this.setState(() => ({
      result: this.state.correctAnswers + " correct out of " + quizQuestions.length
    }));
    // return this.state.correctAnswers + " correct out of " + quizQuestions.length
  }
  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId + 1}
        question={this.state.question}
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
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default App;
