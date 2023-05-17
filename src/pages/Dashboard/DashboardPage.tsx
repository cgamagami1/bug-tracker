import { Link } from "react-router-dom";
import Card from "../../components/Card";
import PriorityChart from "./PriorityChart";
import StatusChart from "./StatusChart";
import IncomingOutgoingChart from "./IncomingOutgoingChart";
import ProjectChart from "./ProjectChart";
import { useEffect } from "react";

export const chartOptions = {
  scales: {
    y: {
      min: 0,
      ticks: {
          stepSize: 1
      }
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
};

const DashboardPage = () => {

  return (
    <div className="h-full w-full flex flex-col">
      <h2 className="text-xl mb-6"><Link to="/">Dashboard</Link></h2>

      <div className="grid-cols-1 grid md:grid-cols-2 md:grid-rows-2 gap-8 flex-grow">
        <Card title="Tickets By Priority">
          <PriorityChart />
        </Card>
        <Card title="Tickets By Status">
          <StatusChart />
        </Card>
        <Card title="Incoming vs Outgoing For Last 30 Days">
          <IncomingOutgoingChart />
        </Card>
        <Card title="Tickets By Project">
          <ProjectChart />
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;