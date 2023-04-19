
type DetailsCardItemProps = {
  name: string;
  value: string;
  spanTwoColumns?: boolean;
}

const DetailsCardItem = ({ name, value, spanTwoColumns = false }: DetailsCardItemProps) => {
  return (
    <div className={`p-2 ${spanTwoColumns ? "col-span-2" : ""}`}>
      <h3 className="font-bold">{ name }</h3>
      <p>{ value }</p>
    </div>
  );
}

export default DetailsCardItem;