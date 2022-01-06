const Button = (props) => {
  return (
    <button className="button" onClick={props.click}>
      {props.text}
    </button>
  );
};

export default Button;
