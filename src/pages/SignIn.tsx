import useInputData from "../hooks/useInputData";
import Input from "../component/common/input/Input.component";
import {FormEvent} from "react";
import Button from "../component/common/button/Button.component";
import RadioGroup from "../component/common/input/RadioGroup";
import SelectGroup from "../component/common/input/SelectGroup";

const initialState = {
  id: '',
  password: '',
}
const SignIn = () => {
  const [form, onChange, reset] = useInputData(initialState);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(form);
  }

  return <main>
    <form onSubmit={submitHandler} method='post' >
      <Input name='id' onChange={onChange} placeholder='Enter ID' />
      <Input name='password' onChange={onChange} placeholder='Enter Password' />
      <Button type='submit' text='SignIn' />
      <RadioGroup title={'title'} selectLists={['a', 'b']}/>
      <SelectGroup selectList={['a','b','c']} title={'alpha'}/>
    </form>
  </main>
};

export default SignIn;
