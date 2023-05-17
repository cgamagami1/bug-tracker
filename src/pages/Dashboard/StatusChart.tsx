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
import { STATUS, TicketContext, Ticket } from '../../context/TicketContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatusChart = () => {
  const { tickets } = useContext(TicketContext);

  const statusReducer = (status: STATUS) => (acc: number, ticket: Ticket) => ticket.status === status ? acc + 1 : acc;

  const openCount = tickets.reduce(statusReducer(STATUS.OPEN), 0);
  const inProgressCount = tickets.reduce(statusReducer(STATUS.IN_PROGRESS), 0);
  const closedCount = tickets.reduce(statusReducer(STATUS.CLOSED), 0);

  const data = {
    labels: ["Open", "In Progress", "Closed"],
    datasets: [
      {
        label: 'Status',
        data: [openCount, inProgressCount, closedCount],
        backgroundColor: ['#ff638488', '#fceb4e88', '#70ff6388'],
      },
    ],
  };

  return (
    <div className='flex-grow my-2'>
      <Bar options={chartOptions} data={data} />
    </div>
  );
}

export default StatusChart;