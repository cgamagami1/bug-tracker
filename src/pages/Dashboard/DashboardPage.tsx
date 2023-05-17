import { Link } from "react-router-dom";
import PageRow from "../../components/PageRow";
import Card from "../../components/Card";
import PriorityChart from "./PriorityChart";

const DashboardPage = () => {
  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/">Dashboard</Link></h2>

      <PageRow>
        <Card title="Tickets By Priority">
          <PriorityChart />
        </Card>
        <Card title="Tickets By">

        </Card>
      </PageRow>
      <PageRow>
        <Card title="Tickets By">

        </Card>
        <Card title="Tickets By">

        </Card>
      </PageRow>
    </div>
  );
}

export default DashboardPage;