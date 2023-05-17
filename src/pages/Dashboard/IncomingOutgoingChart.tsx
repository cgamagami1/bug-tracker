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
import { TicketContext } from '../../context/TicketContext';
import { DateTime } from 'luxon';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomingOutgoingChart = () => {
  const { tickets } = useContext(TicketContext);

  const incomingCount = tickets.reduce((acc, ticket) => ticket.dateCreated > DateTime.now().minus({ days: 30 }) ? acc + 1 : acc, 0);
  const outgoingCount = tickets.reduce((acc, ticket) => ticket.dateClosed > DateTime.now().minus({ days: 30 }) ? acc + 1: acc, 0);

  const data = {
    labels: ["Opened", "Closed"],
    datasets: [
      {
        label: 'Incoming vs Outgoing',
        data: [incomingCount, outgoingCount],
        backgroundColor: ['#ff638488', '#70ff6388'],
      },
    ],
  };

  return (
    <div className='flex-grow my-2'>
      <Bar options={chartOptions} data={data} />
    </div>
  );
}

export default IncomingOutgoingChart;