import {ChangeEvent} from "react";
import styles from './Input.module.css';


type InputProps = {
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string
}
const Input = ({name, onChange, placeholder}: InputProps) => {

  return (
      <input className={styles['input']} name={name} onChange={onChange} placeholder={placeholder || ''}/>
  )
}

export default Input;