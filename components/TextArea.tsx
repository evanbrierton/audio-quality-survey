type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const Textarea = ({ value, onChange }: Props) => (
  <textarea value={value} onChange={onChange} />
);

export default Textarea;
