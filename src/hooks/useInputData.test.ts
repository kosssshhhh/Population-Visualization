import React from "react";
import { renderHook } from '@testing-library/react';
import useInputData from './useInputData';
import { act } from 'react-dom/test-utils';

describe('a', () => {
  it('InputForm Test', () => {
    const initialForm = {
      id: '',
      password: '',
    };
    const changedForm = {
      id: '123',
      password: '',
    };
    const { result } = renderHook(() => useInputData(initialForm));

    const [initialValue, changeInput] = result.current;

    expect(initialValue).toBe(initialForm);

    act(() =>
      changeInput({
        target: { value: '123', name: 'id' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    const [changedResult] = result.current;

    expect(changedResult.id).toBe(changedForm.id);
    // expect(changedResult.password).toBe(changedForm.password);
  });

  it('InputForm Test2', () => {
    const initialForm = {
      id: '',
      password: '',
    };
    const changedForm = {
      id: '',
      password: '123',
    };
    const { result } = renderHook(() => useInputData(initialForm));

    const [initialValue, changeInput] = result.current;

    expect(initialValue).toBe(initialForm);

    act(() =>
      changeInput({
        target: { value: '123', name: 'password' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    const [changedResult] = result.current;

    expect(changedResult.password).toBe(changedForm.password);
  });
});
