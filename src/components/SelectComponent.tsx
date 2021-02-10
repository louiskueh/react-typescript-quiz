import Select from 'react-select'

function convertToSelectObject(object:any){
  return {value: object.name, label: object.name}
}

function SelectComponent (props:selectProps){
  // console.log("Select component " + JSON.stringify(props.items))
  const resultConvert = props.items.map( convertToSelectObject );
  // console.log("result convert is ")
  return (
    <Select options={resultConvert} />
  )
}

type selectProps = {
  items: Array<any>
};

export default SelectComponent