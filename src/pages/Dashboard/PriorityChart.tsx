import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { chartOptions } from './DashboardPage';
import { useContext } from 'react';
import { PRIORITY, Ticket, TicketContext } from '../../context/TicketContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PriorityChart = () => {
  const { tickets } = useContext(TicketContext);

  const priorityReducer = (priority: PRIORITY) => (acc: number, ticket: Ticket) => ticket.priority === priority ? acc + 1 : acc;

  const lowPriorityCount = tickets.reduce(priorityReducer(PRIORITY.LOW), 0);
  const mediumPriorityCount = tickets.reduce(priorityReducer(PRIORITY.MEDIUM), 0);
  const highPriorityCount = tickets.reduce(priorityReducer(PRIORITY.HIGH), 0);

  const data = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: 'Priority',
        data: [lowPriorityCount, mediumPriorityCount, highPriorityCount],
        backgroundColor: ['#70ff6388', '#fceb4e88', '#ff638488'],
      },
    ],
  };

  return (
    <div className='flex-grow my-2'>
      <Bar options={chartOptions} data={data} />
    </div>
  );
}

export default PriorityChart;