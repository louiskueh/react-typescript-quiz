import Question from "../components/Question";
import QuestionCount from "../components/QuestionCount";
import Choice from "./Choice";

function Quiz(props: quizProps) {
  function renderChoices(choice: any) {
    return (
      <Choice
        key={choice.content}
        answerContent={choice.content}
        answer={props.answer}
        id={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }
  return (
    <div className="quiz">
      <QuestionCount
        questionId={props.questionId}
        total={props.questionTotal}
      />
      <Question content={props.question} />
      <ul className="answerChoices">
        {props.answerChoices.map(renderChoices)}
      </ul>
    </div>
  );
}

type quizProps = {
  answer: string;
  answerChoices: object[];
  question: string;
  questionId: number;
  questionTotal: number;
  onAnswerSelected: (event: any) => void;
};

export default Quiz;
