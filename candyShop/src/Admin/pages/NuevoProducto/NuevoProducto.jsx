import "./Home.scss";
import Sidebar from "../../../layouts/SideBar/SideBar";
import NavAdmin from "../../../layouts/NavAdmin/NavAdmin";
import NewProducto from "../../components/NewProducto/New";


const NuevoProductoo = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <NavAdmin />
        <NewProducto/>
        
      </div>
    </div>
  );
};

export default NuevoProductoo;
