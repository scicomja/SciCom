import React from 'react'
import {
  Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap'
import _ from 'lodash'

/*
  Component: the parent of the elements below
  Config: the configuration, some compulsory fields:
    - fieldName
    optional field:

*/
export const TextInput = (config) => {
  const inputConfig = _.omit(config, ['fieldName','style'])
  const fn = config.fieldName
  return (
    <FormGroup style={config.style}>
      <Label for={fn}>{fn}</Label>
      <Input name={fn} id={fn} {...inputConfig} />
    </FormGroup>
  )
}

export const SelectInput = (config) => {
  const inputConfig = _.omit(config, ['fieldName','options'])
  const fn = config.fieldName
  return (
    <FormGroup style={config.style}>
      <Label for={fn}>{fn}</Label>
      <Input type="select" name={fn} id={fn} {...inputConfig}>
        {config.options.map(
          opt => (<option key={opt}>{opt}</option>)
        )}
      </Input>
    </FormGroup>
  )
}
export const CreateForm = (config) => {
  const fields = config.map(conf => {
    switch(conf.type) {
      case "select":
        return SelectInput(conf)
      default:
        return TextInput(conf)
    }
  })
  return (
    <Form>
      {fields}
    </Form>
  )
}
