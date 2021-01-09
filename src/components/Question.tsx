function Question(props : questionProps) {
  return (
    <h2 className="question">{props.content}</h2>
  );
}

type questionProps = {
  content: string,
};

export default Question;