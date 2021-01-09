
function Choice(props:choiceProps) {
    return (
      <li className="answerOption">
        <input
          type="radio"
          className="radioCustomButton"
          name="radioGroup"
          checked={props.answerType === props.answer}
          id={props.answerType}
          value={props.answerType}
          disabled={props.disabled}
          onChange={props.onAnswerSelected}
        />
        <label className="radioCustomLabel" htmlFor={props.answerType}>
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
    disabled: boolean,
    onAnswerSelected: (event:any) => void
  };
  
  export default Choice;