import React, { Component } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import Result from "./components/Results";
import ReactLoading from "react-loading";
import SelectComponent from "./components/SelectComponent"
import ReactPlayer from 'react-player/youtube'

const endpoint =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9000/.netlify/functions/graphql/"
    : "/.netlify/functions/graphql/";
// Create a component that displays the given user's details
interface IProps { }
interface IState {
  quizQuestions: any;
  questionId: number;
  question: string;
  title: string;
  answerOptions: object[];
  answer: string;
  finishQuizData: boolean;
  correctAnswers: number;
  result: string;
  quizNames: object[];
  youtubeLink:string;
}
class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      quizQuestions: [],
      title: "",
      finishQuizData: false,
      questionId: 0,
      question: "",
      answerOptions: [],
      correctAnswers: 0,
      answer: "",
      result: "",
      quizNames: [],
      youtubeLink: ""
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  async componentDidMount() {

    // console.log("env is " + process.env.NODE_ENV)
    // console.log("endpoint is " + endpoint)
    // fetch data about all the quizzes
    fetch(endpoint + "quizzes/name")
      .then(response => response.json())
      .then(data => {
        console.log("quiz names" + JSON.stringify(data.data.quizzes))
        this.setState({
          quizNames: data.data.quizzes,
        })
      })
    // fetch data pertaining to a quiz
    fetch(endpoint + "quiz")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          quizQuestions: data.data.quiz.questions,
          title: data.data.quiz.name,
          youtubeLink: data.data.quiz.youtube
        });
        const shuffledAnswerOptions = this.state.quizQuestions.map(
          (question: { answers: object[] }) =>
            this.shuffleArray(question.answers)
        );

        this.setState({
          question: this.state.quizQuestions[0].question,
          answerOptions: shuffledAnswerOptions[0],
          finishQuizData: true,
        });
      });
  }

  shuffleArray(array: object[]) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

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
  }

  setNextQuestion() {
    const questionId = this.state.questionId + 1;
    this.setState({
      questionId: questionId,
      question: this.state.quizQuestions[questionId].question,
      answerOptions: this.state.quizQuestions[questionId].answers,
      answer: "",
    });
  }
  setUserAnswer(answer: string) {
    this.setState(() => ({
      answer: answer,
    }));
  }

  handleAnswerSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    console.log(value);

    if (value === "correct") {
      this.setState((prevState) => ({
        correctAnswers: prevState.correctAnswers + 1,
      }));
    }

    this.setUserAnswer(value);

    if (this.state.questionId + 1 < this.state.quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 200);
    } else {
      setTimeout(() => this.getResults(), 200);
    }
  }

  getResults() {
    this.setState(() => ({
      result:
        this.state.correctAnswers +
        " correct out of " +
        this.state.quizQuestions.length,
    }));
  }
  onSelect(key: any) {
    console.log(`${key} selected`)
  }

  onVisibleChange(visible: any) {
    console.log(visible)
  }

  renderQuiz() {
    return (
      <div className="container">
        <Quiz
          answer={this.state.answer}
          answerChoices={this.state.answerOptions}
          questionId={this.state.questionId + 1}
          question={this.state.question}
          questionTotal={this.state.quizQuestions.length}
          onAnswerSelected={this.handleAnswerSelected}
        />
      </div>
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  render() {
    return (
      <div>
        <div className="quizHeader">
          {this.state.finishQuizData ? (
            <div >
              <h2>  {this.state.title}</h2>
              <div className="video">
                <ReactPlayer url={this.state.youtubeLink} controls={true}/>
              </div>
            </div>

          ) :   <div className="loading">
          <ReactLoading type={"bars"} color={"#FFFFFF"} />
        </div>}

        </div>
        {this.state.finishQuizData ? (
          <div>
            <div>
              <SelectComponent items={this.state.quizNames}></SelectComponent>
            </div>
            <div>
              {this.state.result ? this.renderResult() : this.renderQuiz()}
            </div>

          </div>
        ) : (
          <div className="loading">
            <ReactLoading type={"bars"} color={"#1F2430"} />
          </div>
        )}

      </div>
    );
  }
}

export default App;
