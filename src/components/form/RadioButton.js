import React from 'react'
import { Field } from 'formik'

function RadioButtons (props) {
  const { label, name, options, ...rest } = props
  return (
    <div className='mb-3'>
      <label className='form-label w-100'>{label}</label>
      <Field name={name} >
        {({ field }) => {
          return options.map(option => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type='radio'
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                  className="form-check-input me-1"
                />
                <label htmlFor={option.value} className="form-check-label me-3">{option.key}</label>
              </React.Fragment>
            )
          })
        }}
      </Field>
    </div>
  )
}

export default RadioButtons
