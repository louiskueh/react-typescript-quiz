import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import Choice from './Choice';

function Quiz(props: quizProps) {
    function renderChoices(choice: any) {
        return (
            <Choice
                key={choice.content}
                answerContent={choice.content}
                // correct or incorrect
                answerType={choice.type}
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
            <ul className="answerOptions">
                {props.answerOptions.map(renderChoices)}
            </ul>
        </div>
    );
}



type quizProps = {
    answer: string,
    answerOptions: object[],
    question: string,
    questionId: number,
    questionTotal: number,
    onAnswerSelected: (event:any) => void
};

export default Quiz;