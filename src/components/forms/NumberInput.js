import React from 'react';
import {Input} from 'reactstrap';

const NumberInput = ({ input,label, type, meta: { touched, error, warning } }) => (
 <div>
      <Input {...input} placeholder={label} type={type} className="input-bgColor" size="20" maxLength="4"/>
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
 </div>
);
  
export default NumberInput;