import SelectBox from "./SelectBox";

type Props = {
  selectList: string[];
  title: string;
}
const SelectGroup = ({selectList, title}: Props) => {
  return (
      <div>
        <label htmlFor={title}>{title}</label>
        <select id={title}>
          {
            selectList.map((item, idx) =>
                <SelectBox key={item + Math.random()} value={item}
                           selected={idx === 0 && true}/>)
          }
        </select>
      </div>);
}
export default SelectGroup;