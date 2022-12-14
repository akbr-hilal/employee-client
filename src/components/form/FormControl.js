import React from 'react';
import Input from './Input';
import RadioButtons from './RadioButton';
import Textarea from './Textarea';
import Select from './Select';

function FormControl(props) {
  const { control, ...rest } = props
  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'radio':
      return <RadioButtons {...rest} />
    case 'textarea': 
      return <Textarea {...rest} />
    case 'select': 
      return <Select {...rest} />
    default:
      return null;
  }
}

export default FormControl