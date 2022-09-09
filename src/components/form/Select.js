import React from 'react'
import { Field } from 'formik'

function Select (props) {
  const { label, name, options, ...rest } = props
  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <Field as='select' id={name} name={name} {...rest} className='form-select'>
        {options.map(option => {
          return (
            <option key={option.key} value={option.value}>
              {option.value}
            </option>
          )
        })}
      </Field>
    </div>
  )
}

export default Select
