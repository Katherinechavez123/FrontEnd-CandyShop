import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { BiGift } from "react-icons/bi";
import "./SideBar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/logo-v1-01.png"
            alt=""
            className="logosidebar"
          />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li>
            <DashboardIcon className="icon" />
            <span>Panel</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/productos-admin" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Productos</span>
            </li>
          </Link>
          <Link to={"/anchetas-admin"}>
            <li>
              <BiGift className="icon" />
              <span>Anchetas</span>
            </li>
          </Link>
          <Link to={"/ventas"}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Ventas</span>
            </li>
          </Link>

          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Perfil</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Salir</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
