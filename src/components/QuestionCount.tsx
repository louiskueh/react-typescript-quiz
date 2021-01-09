
function QuestionCount(props: questionCountProps) {
  return (
    <div className="questionCount">
      Question <span>{props.counter}</span> of <span>{props.total}</span>
    </div>
  );
}

type questionCountProps = {
  counter: number,
  total: number
};

export default QuestionCount;