import "./Home.scss";
import Sidebar from "../../../layouts/SideBar/SideBar";
import NavAdmin from "../../../layouts/NavAdmin/NavAdmin";
import Panel from "../../components/Panel/Panel";



const HomeAdmin = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <NavAdmin />
        <Panel/>
        
      </div>
    </div>
  );
};

export default HomeAdmin;
