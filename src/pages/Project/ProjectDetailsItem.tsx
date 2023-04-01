
type ProjectDetailsItemProps = {
  name: string;
  value: string;
}

const ProjectDetailsItem = ({ name, value}: ProjectDetailsItemProps) => {
  return (
    <div className="p-2">
      <h3 className="font-bold">{ name }</h3>
      <p>{ value }</p>
    </div>
  );
}

export default ProjectDetailsItem;