import { useContext, useEffect, useState } from "react";

import { context } from "../../../Contexts/state";

import "./ColorList.scss";

interface Props {
  filterValues: {
    red: boolean;
    green: boolean;
    blue: boolean;
    saturation: boolean;
  };
}

const ColorList = (props: Props) => {
  const [storedColorsArray, setStoredColorsArray] = useState<string[]>();
  const state = useContext(context);

  const { red } = props.filterValues;
  const { green } = props.filterValues;
  const { blue } = props.filterValues;
  const { saturation } = props.filterValues;

  const storedColors = localStorage.getItem("colors");

  const handleClick = (color: string) => {
    const newArray = [...(storedColorsArray as string[])];
    const elementToDeleteIndex = newArray?.findIndex((el) => el === color);
    newArray?.splice(elementToDeleteIndex as number, 1);
    localStorage.setItem("colors", JSON.stringify(newArray));
    setStoredColorsArray(newArray);
  };

  useEffect(() => {
    let colors = [...JSON.parse(storedColors as string)];

    const filterColors = () => {
      if (red) {
        const filteredArr = colors?.filter(
          (el) => parseInt(el.slice(1, 3), 16) > 127
        );
        setStoredColorsArray(filteredArr);
        if (red && green) {
          const filteredArr = colors?.filter(
            (el) =>
              parseInt(el.slice(1, 3), 16) > 127 &&
              parseInt(el.slice(3, 5), 16) > 127
          );
          setStoredColorsArray(filteredArr);
        }
      }
      if (green) {
        const filteredArr = colors?.filter(
          (el) => parseInt(el.slice(3, 5), 16) > 127
        );
        setStoredColorsArray(filteredArr);
      }
      if (blue) {
        const filteredArr = colors?.filter(
          (el) => parseInt(el.slice(5, 7), 16) > 127
        );
        setStoredColorsArray(filteredArr);
      }
    };

    if (storedColors) {
      setStoredColorsArray([...JSON.parse(storedColors)].sort().reverse());
    }
    filterColors();
  }, [state, storedColors, red, green, blue]);
  document.documentElement.style.setProperty(
    "--colors_list",
    storedColorsArray?.toString().replaceAll(",", " ") as string
  );
  return (
    <ul>
      <li data-color={"#111111"}>
        <div
          style={{
            backgroundColor: "#111111",
            width: "20px",
            height: "20px",
          }}
        ></div>
        #111111
      </li>
      <li data-color={"#222222"}>
        <div
          style={{
            backgroundColor: "#222222",
            width: "20px",
            height: "20px",
          }}
        ></div>
        #222222
      </li>
      <li data-color={"#333333"}>
        <div
          style={{
            backgroundColor: "#333333",
            width: "20px",
            height: "20px",
          }}
        ></div>
        #333333
      </li>
      {storedColorsArray?.map((color, index) => {
        return (
          <li key={color + index}>
            <div>
              <div
                data-color={color}
                style={{
                  backgroundColor: color,
                  width: "20px",
                  height: "20px",
                }}
              ></div>
              <div data-storage>
                <span onClick={() => handleClick(color)}>x</span>
                {color.toUpperCase()}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ColorList;
