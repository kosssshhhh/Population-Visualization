// CheckBoxList
import React, { ChangeEvent, useEffect, useState } from 'react';
import CheckBox from './CheckBox';

type Props = {
  checkList: string[];
  checkItems: Set<string>;
  setCheckItems: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export default function CheckboxList({
  checkList,
  checkItems,
  setCheckItems,
}: Props) {
  const [isAllChecked, setIsAllChecked] = useState(false);

  const checkItemHandler = (id: string, isChecked: boolean) => {
    if (isChecked) {
      checkItems.add(id);
      setCheckItems(new Set(checkItems));
    } else if (!isChecked) {
      checkItems.delete(id);
      setCheckItems(new Set(checkItems));
    }
  };

  const allCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckItems(new Set(checkList.map((check) => check)));
      setIsAllChecked(true);
    } else {
      checkItems.clear();
      setCheckItems(new Set(checkItems));
      setIsAllChecked(false);
    }
  };

  return (
    <div>
      <header>
        <label style={{ color: 'white' }}>
          <input type='checkbox' onChange={(e) => allCheckedHandler(e)} />
          전체선택
        </label>
      </header>

      {checkList.map((text, index) => (
        <CheckBox
          key={index}
          id={text}
          text={text}
          checkItemHandler={checkItemHandler}
          isAllChecked={isAllChecked}
        />
      ))}
    </div>
  );
}
