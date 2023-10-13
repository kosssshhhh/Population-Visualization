import RadioButton from "./RadioButton";
// import {randomUUID} from "crypto";

type RadioButtonsProps = {
  title: string;
  selectLists: string[];
}
const RadioGroup = ({title, selectLists}: RadioButtonsProps) => {
  return (
      <fieldset>
        <legend>{title}</legend>
        {
          selectLists.map((item, idx) =>
              <RadioButton key={item + Math.random()} value={item} name={title}
                           children={item} defaultChecked={idx === 0 && true}/>)
        }
      </fieldset>
  )
}

export default RadioGroup;