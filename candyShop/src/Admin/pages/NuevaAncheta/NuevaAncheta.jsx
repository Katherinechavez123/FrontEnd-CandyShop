import "./Home.scss";
import Sidebar from "../../../layouts/SideBar/SideBar";
import NavAdmin from "../../../layouts/NavAdmin/NavAdmin";
import New from "../../components/NewAncheta/New";


const NuevaAncheta = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <NavAdmin />
        <New/>
        
      </div>
    </div>
  );
};

export default NuevaAncheta;
