import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { TicketContext } from "../../context/TicketContext";

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const ProjectChart = () => {
  const { projects } = useContext(ProjectContext);
  const { tickets } = useContext(TicketContext);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true
      }
    },
  };

  const data = {
    labels: projects.map(project => project.title),
    datasets: [
      {
        label: 'Projects',
        data: projects.map(project => tickets.reduce((acc, ticket) => ticket.projectId === project.id ? acc + 1 : acc, 0)),
        backgroundColor: ['#ff638488', '#fceb4e88', '#70ff6388'],
      },
    ],
  };

  return (
    <div className='flex-grow my-2'>
      <Doughnut options={chartOptions} data={data} />
    </div>
  );
}

export default ProjectChart;