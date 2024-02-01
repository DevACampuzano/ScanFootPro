import { useState } from "react";

const useForm = <T extends object>(initState: T) => {
  const [state, setState] = useState(initState);

  const onChange = (value: any, key: keyof T) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const setForm = (form: any) => {
    setState({
      ...state,
      ...form,
    });
  };

  const resetForm = () => {
    setForm(initState);
  };

  return {
    ...state,
    form: state,
    onChange,
    setForm,
    resetForm,
  };
};

export default useForm;
