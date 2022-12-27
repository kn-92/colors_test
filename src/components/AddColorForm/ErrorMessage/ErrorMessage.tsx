import "./ErrorMessage.scss";

interface Props {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: Props) => {
  return <div>{errorMessage}</div>;
};

export default ErrorMessage;
