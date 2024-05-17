import { Label } from './ui/label'
import { Input } from './ui/input'
import React from 'react';

type Props = {
  label: string;
  htmlFor: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputCompoment({ label, htmlFor, id, onChange }: Props) {
  return (
    <>
      <div className="mb-2 space-y-2">
        <Label htmlFor={htmlFor}>{ label }</Label>
        <Input type="text" id={id} onChange={onChange}/>
      </div>      
    </>
  )
}

export default InputCompoment
