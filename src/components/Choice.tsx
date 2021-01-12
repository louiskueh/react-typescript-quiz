import { ChangeEvent, useState } from "react";
import _uniqueId from "lodash/uniqueId";

function Choice(props: choiceProps) {
  const [id] = useState(_uniqueId("prefix-"));
  return (
    <li className="answerOption">
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        id={id}
        value={props.answerType}
        onChange={props.onAnswerSelected}
      />
      <label className="radioCustomLabel" htmlFor={id}>
        {props.answerContent}
      </label>
    </li>
  );
}

type choiceProps = {
  answerContent: string;
  answer: string;
  id: number;
  answerType: string;
  onAnswerSelected: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default Choice;
