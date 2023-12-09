import "./Home.scss";
import Sidebar from "../../../layouts/SideBar/SideBar";
import NavAdmin from "../../../layouts/NavAdmin/NavAdmin";
import Sales from "../../components/Sales-admin/Sales";


const Ventas = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <NavAdmin />
        <Sales/>
        
      </div>
    </div>
  );
};

export default Ventas;
