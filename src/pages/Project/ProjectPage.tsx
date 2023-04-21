import { useParams, Link } from "react-router-dom";
import TeamMemberTable from "./TeamMemberTable";
import TicketsTable from "../../components/TicketsTable";
import DetailsCard from "../../components/DetailsCard";
import DetailsCardItem from "../../components/DetailsCardItem";
import PageRow from "../../components/PageRow";
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase-config";
import { Ticket } from "../../context/TicketContext";
import { timestampToDateTime } from "../../utils/date-conversion";

const ProjectPage = () => {
  const { projectId } = useParams();
  const { projects } = useContext(ProjectContext);
  const project = projects.find(project => project.id === projectId);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const getTickets = async () => {
      if (!project) return;

      const ticketSnapshot = await getDocs(query(collection(db, "tickets"), where("projectId", "==", project.id)));

      const ticketList = ticketSnapshot.docs.map(document => {
        return {
          ...document.data(),
          id: document.id,
          dateCreated: timestampToDateTime(document.data().dateCreated),
        } as Ticket;
      })

      setTickets(ticketList);
    }

    getTickets();
  }, [project]);
  
  if (!project) return <></>;
  
  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link> &gt; <Link to={`/projects/${projectId}`}>{ project.title }</Link></h2>

      <PageRow>
        <DetailsCard title={project.title}>
          {project.description && <DetailsCardItem name="Description" value={project.description} spanTwoColumns />}
          {project.startDate && <DetailsCardItem name="Start Date" value={project.startDate.toISODate()} />}
          {project.endDate && <DetailsCardItem name="End Date" value={project.endDate.toISODate()} />}
        </DetailsCard>
        <TeamMemberTable projectId={project.id} />
      </PageRow>
      <TicketsTable tickets={tickets} />
    </div>
  );
}

export default ProjectPage;