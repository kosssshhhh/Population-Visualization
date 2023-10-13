import {ChangeEvent, useCallback, useState} from "react";

const useInputData = <T>(initialForm: T) => {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setForm(form => ({...form, [name]: value}));
  }, []);

  console.log(form);

  const reset = useCallback(() => {
    setForm(initialForm);
  }, [initialForm]);

  return [form, onChange, reset] as const;
}

export default useInputData;