// CheckBox
import React, { ChangeEvent, useEffect, useState } from 'react';

type Props = {
  checkItemHandler: (id: string, isChecked: boolean) => void;
  text: string;
  id: string;
  isAllChecked: boolean;
};

export default function CheckBox({
  checkItemHandler,
  text,
  id,
  isAllChecked,
}: Props) {
  const [checked, setChecked] = useState(false); // 체크 여부 판단

  const checkHandled = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    checkItemHandler(e.target.id, e.target.checked);
  };

  const allCheckHandler = () => setChecked(isAllChecked);
  useEffect(() => allCheckHandler(), [isAllChecked]);

  return (
    <div>
      <label>
        <input
          id={id}
          type='checkbox'
          checked={checked}
          onChange={(e) => checkHandled(e)}
        />
        <label htmlFor={id} style={{color: 'white'}}>{text}</label>
      </label>
    </div>
  );
}
