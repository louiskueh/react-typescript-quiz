import Select from 'react-select'

function convertToSelectObject(object: any) {
  return { value: object.name, label: object.name }
}

function SelectComponent(props: selectProps) {

  const resultConvert = props.items.map(convertToSelectObject);
  return (
    <Select options={resultConvert} />
  )
}

type selectProps = {
  items: Array<any>
};

export default SelectComponent