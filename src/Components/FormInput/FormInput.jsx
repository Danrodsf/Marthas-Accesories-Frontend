import { useState } from "react";

const FormInputs = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <div className="inputs">
        <label className="label">{label}</label>
        <input
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() =>
            inputProps.name === "confirmPassword" && setFocused(true)
          }
          focused={focused.toString()}
        />
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};

export default FormInputs;
