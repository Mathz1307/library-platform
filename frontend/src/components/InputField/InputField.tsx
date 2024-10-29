import './InputField.css';

type InputFieldProps = {
    text: string;
    type: string;
    name: string;
    value?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

function InputField({ text, type, name, value, onChange, placeholder }: InputFieldProps) {
    return (
        <label className="input_field">
            <p className="input_text">{text}</p> 
            <input className="input_box" 
            type={type} 
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder} 
            />
        </label>
    );
}

export default InputField;