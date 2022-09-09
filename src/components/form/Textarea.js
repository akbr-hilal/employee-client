import React from 'react'
import { Field } from 'formik'

function Textarea (props) {
  const { label, name, ...rest } = props
  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <Field as='textarea' id={name} name={name} {...rest} className='form-control' row={3}/>
    </div>
  )
}

export default Textarea
