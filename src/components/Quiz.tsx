import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import Choice from './Choice';

function Quiz(props: quizProps) {
    function renderChoices(choice: any) {
        return (
            <Choice
                key={choice.content}
                answerContent={choice.content}
                answerType={choice.type}
                answer={props.answer}
                id={props.questionId}
                disabled={props.disabled}
                onAnswerSelected={props.onAnswerSelected}
            />
        );
    }
    return (
        <div className="quiz">
            <QuestionCount
                counter={props.questionId}
                total={props.questionTotal}
            />
            <Question content={props.question} />
            <ul className="answerOptions">
                {props.answerOptions.map(renderChoices)}
            </ul>
        </div>
    );
}



type quizProps = {
    answer: string,
    answerOptions: object[],
    counter: number,
    question: string,
    questionId: number,
    questionTotal: number,
    disabled:boolean,
    onAnswerSelected: (event:any) => void
};

export default Quiz;