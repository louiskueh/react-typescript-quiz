
function Choice(props:choiceProps) {
    return (
      <li className="answerOption">
        <input
          type="radio"
          className="radioCustomButton"
          name="radioGroup"
          // checked={props.answerType === props.answer}
          id={props.answerType}
          value={props.answerType}
          onChange={props.onAnswerSelected}
        />
        <label className="radioCustomLabel" >
          {props.answerContent}
        </label>
      </li>
    );
  }
  
  type choiceProps = {
    answerType: string,
    answerContent: string,
    answer: string,
    id:number,
    onAnswerSelected: (event:any) => void
  };
  
  export default Choice;