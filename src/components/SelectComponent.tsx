import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

function SelectComponent (props:selectProps){
  return (
    <Select options={options} />
  )
}

type selectProps = {
  items: object[]
};
export default SelectComponent