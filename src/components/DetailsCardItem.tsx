
type DetailsCardItemProps = {
  name: string;
  value: string;
}

const DetailsCardItem = ({ name, value}: DetailsCardItemProps) => {
  return (
    <div className="p-2">
      <h3 className="font-bold">{ name }</h3>
      <p>{ value }</p>
    </div>
  );
}

export default DetailsCardItem;