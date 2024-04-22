import Navbar from "../adminComponents/navbar/Navbar";
import Sidebar from "../adminComponents/sidebar/Sidebar";
import Featured from "../adminComponents/featured/Featured";
import Chart from "../adminComponents/chart/Chart";
import './admin.scss';

const AdminPanel = () => {
  return (
    <div className="home">
        <Sidebar/>
        <div className="homeContainer">
            <Navbar/>
            <div className="charts">
                <Featured/>
                <Chart/>
            </div>
        </div>

    </div>
  )
}

export default AdminPanel;