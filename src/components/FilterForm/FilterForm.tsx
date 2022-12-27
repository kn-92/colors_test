import { useState } from "react";

import "./FilterForm.scss";

import ColorList from "./ColorList/ColorList";

const FilterForm = () => {
  const [checkboxValues, setCheckboxValues] = useState({
    red: false,
    green: false,
    blue: false,
    saturation: false,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValues({
      ...checkboxValues,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <>
      <form>
        <label htmlFor="red">{`Red > 50%`}</label>
        <input
          onChange={handleCheckboxChange}
          type="checkbox"
          name="red"
          id="red"
          checked={checkboxValues.red}
        />
        <label htmlFor="green">{`Green > 50%`}</label>
        <input
          onChange={handleCheckboxChange}
          type="checkbox"
          name="green"
          id="green"
          checked={checkboxValues.green}
        />
        <label htmlFor="blue">{`Blue > 50%`}</label>

        <input
          onChange={handleCheckboxChange}
          type="checkbox"
          name="blue"
          id="blue"
          checked={checkboxValues.blue}
        />
        <label htmlFor="saturation">{`Saturation > 50%`}</label>
        <input
          onChange={handleCheckboxChange}
          type="checkbox"
          name="saturation"
          id="saturation"
          checked={checkboxValues.saturation}
        />
      </form>
      <ColorList filterValues={checkboxValues} />
    </>
  );
};

export default FilterForm;
