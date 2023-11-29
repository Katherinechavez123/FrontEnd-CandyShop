import "./Home.scss";
import Sidebar from "../../../layouts/SideBar/SideBar";
import NavAdmin from "../../../layouts/NavAdmin/NavAdmin";
import ProductosAdmin from "../../components/ProductosAdmin/ProductosAdmin";


const ProductosAd = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <NavAdmin />
        <ProductosAdmin/>
        
      </div>
    </div>
  );
};
export default ProductosAd;