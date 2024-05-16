import { Label } from './ui/label'
import { Input } from './ui/input'

type Props = {
  label: string;
  htmlFor: string;
  id: string;
}

function InputCompoment({ label, htmlFor, id }: Props) {
  return (
    <>
      <div className="mb-2 space-y-2">
        <Label htmlFor={htmlFor}>{ label }</Label>
        <Input type="text" id={ id } />
      </div>      
    </>
  )
}

export default InputCompoment
