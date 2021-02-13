import Select from 'react-select'
import { useHistory,withRouter ,RouteComponentProps} from "react-router-dom";
function convertToSelectObject(object:any){
  return {value: object.name, label: object.name}
}

var currentQuiz = {value: "", label:"Please select a quiz"}
function SelectComponent (props:selectProps){
  const history = useHistory();
  function onChange(o:any){
    console.log("INPUT IS " + JSON.stringify(o))
    history.push("/"+ o.value);
    currentQuiz.label = o.label
    window.location.reload();
  }
  // console.log("Select component " + JSON.stringify(props.items))
  const resultConvert = props.items.map( convertToSelectObject );
  // console.log("result convert is ")
  return (
    <Select 
    defaultValue={currentQuiz}
    onChange={onChange}
    options={resultConvert} />
  )
}

type selectProps = RouteComponentProps<any> & {
  items: Array<any>
  currentQuiz:string
};

export default withRouter(SelectComponent)