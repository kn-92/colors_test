import React, {
  Component,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react";

import ErrorMessage from "./ErrorMessage/ErrorMessage";

interface State {
  input: string;
  colorValidated: boolean;
  isError: boolean;
  errorMessage: string;
}
interface Props {
  state: boolean;
  setContextStateValue: Dispatch<SetStateAction<boolean>>;
}

class AddColorForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      input: "",
      colorValidated: false,
      isError: false,
      errorMessage: "",
    };
  }

  submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.validateInputString();

    const storedData = localStorage.getItem("colors");
    let array: string[] = [];

    if (!storedData) {
      array.push(this.state.input);
      localStorage.setItem("colors", JSON.stringify(array));
    } else {
      array = [...JSON.parse(storedData)];
      array.push(this.state.input);
      localStorage.setItem("colors", JSON.stringify(array));
    }
    this.setState((prevState) => {
      return {
        ...prevState,
        input: "",
      };
    });
    this.props.setContextStateValue(!this.props.state);
  }

  handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const inputString = this.state.input;

    const testExp = /0|1|2|3|4|5|6|7|8|9|A|B|C|D|E|F|a|b|c|d|e|f|#/;

    if (e.key === "Backspace" || e.key === "Enter") {
      return false;
    }
    if (!testExp.test(e.key) || inputString.length === 7) {
      e.preventDefault();
    } else if (inputString.length > 0 && e.key === "#") {
      e.preventDefault();
    }
  }

  validateInputString() {
    this.setState((prevState) => {
      return {
        ...prevState,
        colorValidated: false,
      };
    });
    const inputString = this.state.input;

    if (inputString.length < 7) {
      this.setState((prevState) => {
        return {
          ...prevState,
          isError: true,
          errorMessage:
            "Color has to be 7 characters (A-F a-f) or digits (0-9) long and starts with #",
        };
      });
      throw new Error("Color has to be 7 characters long.");
    }

    if (inputString[0] !== "#") {
      this.setState((prevState) => {
        return {
          ...prevState,
          isError: true,
          errorMessage:
            "Color has to be 7 characters (A-F a-f) or digits (0-9) long and starts with #",
        };
      });
      throw new Error("Color has to start with hash char ");
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        colorValidated: true,
        isError: false,
        errorMessage: "",
      };
    });
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState((prevState) => {
      return { ...prevState, input: e.target.value };
    });
  }

  render() {
    return (
      <>
        <form onSubmit={this.submitForm.bind(this)}>
          <input
            value={this.state.input}
            onKeyDown={this.handleKeyDown.bind(this)}
            onChange={this.handleChange.bind(this)}
            type="text"
            placeholder="Type HEX color"
          />

          <button type="submit">Add color</button>
        </form>
        {this.state.isError && (
          <ErrorMessage errorMessage={this.state.errorMessage} />
        )}
      </>
    );
  }
}

export default AddColorForm;
