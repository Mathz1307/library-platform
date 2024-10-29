import './Button.css';

type ButtonProps = {
    text: string;
    onClickFunction?: () => void;
    type?: "button" | "submit" | "reset";
}

function Button({ text, onClickFunction, type }: ButtonProps) {
    return (
      <button className="button" type={type} onClick={onClickFunction}>{text}</button>
    );
}

export default Button;