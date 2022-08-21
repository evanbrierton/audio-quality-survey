type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const TextInput = ({ value, onChange }: Props) => (
  <input type="text" value={value} onChange={onChange} />
);

export default TextInput;
