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
  const jsAsCSS = (name: string, value: string) => {
    document.documentElement.style.setProperty(name, value);
  };

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
    let arr: string[] = [];

    // const sortColors = () => {};
    // sortColors();
    const filterColors = () => {
      const hexToRGB = (hex: string, alpha: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        console.log(r, g, b);
        if (alpha) {
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        return `rgb(${r}, ${g}, ${b})`;
      };

      // const hexToRGBRed = (hex: string, alpha?: string) => {
      //   r = parseInt(hex.slice(1, 3), 16);

      //   console.log(r);
      //   if (alpha) {
      //     return null;
      //   }

      //   return r;
      // };

      for (const i of colors) {
        const el = hexToRGB(i, "1");
        arr.push(el);
      }
      console.log(arr);
      console.log(colors);
      // if (red && green) {
      //   const filteredArr = storedColorsArray?.filter(
      //     (el) =>
      //       parseInt(el.slice(1, 3), 16) > 127 &&
      //       parseInt(el.slice(3, 5), 16) > 127
      //   );
      //   setStoredColorsArray(filteredArr);
      //   console.log(filteredArr);
      // }

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
          console.log(filteredArr, " z red and green");
        }
        console.log(filteredArr);
      }
      if (green) {
        const filteredArr = colors?.filter(
          (el) => parseInt(el.slice(3, 5), 16) > 127
        );
        setStoredColorsArray(filteredArr);
        // console.log(r);
        console.log(filteredArr);
        // return;
      }
      if (blue) {
        const filteredArr = colors?.filter(
          (el) => parseInt(el.slice(5, 7), 16) > 127
        );
        setStoredColorsArray(filteredArr);
        console.log(filteredArr);
        // return;
      }
    };

    if (storedColors) {
      setStoredColorsArray([...JSON.parse(storedColors)].sort().reverse());
    }
    filterColors();
  }, [state, storedColors, red, green, blue]);
  document.documentElement.style.setProperty(
    "--colors_list",
    JSON.stringify("#112686")
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
                data-colo={color}
                // style={{
                //   backgroundColor: color,
                //   width: "20px",
                //   height: "20px",
                // }}
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
