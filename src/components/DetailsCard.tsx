import DetailsCardItem from "./DetailsCardItem";

type DetailsCardProps = {
  itemName: string;
}

const DetailsCard = ({ itemName }: DetailsCardProps) => {
  return (
    <div className="bg-white rounded-md px-6 py-2 flex-grow text-sm self-stretch">
      <h3 className="text-xl p-2">{ itemName } Details</h3>

      <div className="text-left border-t border-gray-400 w-full grid grid-cols-2">
        <DetailsCardItem name="Property" value="Value" />
        <DetailsCardItem name="Property" value="Value" />
        <DetailsCardItem name="Property" value="Value" />
        <DetailsCardItem name="Property" value="Value" />
        <DetailsCardItem name="Property" value="Value" />
        <DetailsCardItem name="Property" value="Value" />
        <DetailsCardItem name="Property" value="Value" />
        <DetailsCardItem name="Property" value="Value" />
      </div>
    </div>
  );
}

export default DetailsCard;