type Props = {
  defaultChecked?: boolean;
  value: string;
  name: string;
  disabled?: boolean;
  children: string;
}

const RadioButton = ({value, name, disabled = false, defaultChecked = false, children}: Props) => {
  return (
      <label>
        <input type='radio' value={value} name={name} disabled={disabled} defaultChecked={defaultChecked}/>
        {children}
      </label>
  );
}
export default RadioButton;