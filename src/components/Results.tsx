
function Result(props:resultProps) {
  return (
    <div className="result">
      You prefer <strong>{props.quizResult}</strong>!
    </div>
  );
}

type resultProps = {
  quizResult: string,
};

export default Result;