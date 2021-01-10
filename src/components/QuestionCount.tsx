
function QuestionCount(props: questionCountProps) {
  return (
    <div className="questionCount">
      Question <span>{props.questionId}</span> of <span>{props.total}</span>
    </div>
  );
}

type questionCountProps = {
  questionId: number,
  total: number
};

export default QuestionCount;