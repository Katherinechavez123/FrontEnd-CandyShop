import "./Home.scss";
import Sidebar from "../../../layouts/SideBar/SideBar";
import NavAdmin from "../../../layouts/NavAdmin/NavAdmin";
import AnchetasAdmin from "../../components/AnchetasAdmin/AnchetasAdmin";


const Anchetas = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <NavAdmin />
        <AnchetasAdmin/>
        
      </div>
    </div>
  );
};
export default Anchetas;