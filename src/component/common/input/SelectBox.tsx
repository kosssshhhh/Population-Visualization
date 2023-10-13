type Props = {
  value: string;
  selected?: boolean;
}
const SelectBox = ({value, selected = false}: Props) => {
  return (
      <option value={value} selected={selected}>{value}</option>
  )
}

export default SelectBox;