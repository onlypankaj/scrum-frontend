const Button = (props) => {
    
  return (
    <div>
      <button className="ui button blue" onClick={props.action}>{props.label}</button>
    </div>
  );
};

export default Button;
