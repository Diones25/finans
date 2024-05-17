import { Label } from './ui/label'
import { Input } from './ui/input'
import React from 'react';

type Props = {
  label: string;
  htmlFor: string;
  type?: string;
  id: string;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputCompoment({ label, htmlFor, type, id, name, value, onChange }: Props) {
  return (
    <>
      <div className="mb-2 space-y-2">
        <Label htmlFor={htmlFor}>{ label }</Label>
        <Input type={type} id={id} name={name} value={value} onChange={onChange}/>
      </div>      
    </>
  )
}

export default InputCompoment
