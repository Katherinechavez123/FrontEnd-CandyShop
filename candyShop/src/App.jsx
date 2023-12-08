import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useActionData,
} from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Contacto from "./components/contacto/Contacto";
import Header from "./layouts/Header/Header";
import Home from "./pages/Home/Home";
import Productos from "./components/productos/Productos";
import LlenarDatos from "./components/LlenarDatos/LlenarDatos";
import VerDetalle from "./components/verDetalle/VerDetalle";
import Footer from "./layouts/Footer/Footer";
import Nosotros from "./components/nosotros/Nosotros";
import LoginAdmin from "./Admin/components/LoginAdmin/LoginAdmin";
import { useState } from "react";
import Personalizar from "./components/Personalizar/Personalizar";
import Compra from "./components/Compra/Compra";
import PreCompra from "./components/PreCompra/Precompra";
import Modals from "./layouts/Modal/Modals";
import Panel from "./Admin/components/Panel/Panel";
import Sidebar from "./layouts/SideBar/SideBar";
import NavAdmin from "./layouts/NavAdmin/NavAdmin";
import HomeAdmin from "./Admin/pages/Home/Home";
import NuevaAncheta from "./Admin/pages/NuevaAncheta/NuevaAncheta";
import Anchetas from "./Admin/pages/Anchetas/Anchetas";
import ProductosAd from "./Admin/pages/Productos/Productos";
import MisCompras from "./components/MisCompras/MisCompras";

//import NavAdmin from "./layouts/NavAdmin/NavAdmin";
//import Sidebar from "./layouts/SideBar/SideBar";*/

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const id_cliente = JSON.parse(
    localStorage.getItem("registrationData")
  )?.id_cliente;

  const numbreProd = allProducts.length;
  console.log(numbreProd);
  console.log(allProducts);

  const [carrito, setCarrito] = useState([]);

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/misCompras"
          element={
            <>
              <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <MisCompras id_cliente={id_cliente} />
              <Footer />
            </>
            
          }
        />
        <Route
          path="/nuevaAncheta"
          element={
            <>
              <NuevaAncheta />
            </>
          }
        />
        <Route
          path="/panelAdmin"
          element={
            <>
              <HomeAdmin />
            </>
          }
        />
        <Route
          path="/anchetas-admin"
          element={
            <>
              <Anchetas />
            </>
          }
        />
        <Route
          path="/productos-admin"
          element={
            <>
              <ProductosAd />
            </>
          }
        />
        <Route
          path="/miweb"
          element={
            <>
              <LoginAdmin />
            </>
          }
        />
        <Route
          path="/panel"
          element={
            <>
              <NavAdmin />
              <Sidebar />
              <Panel />
            </>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />

              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <Register />
              <Footer />
              <Modals />
            </>
          }
        />

        {/*         <Route
          path="/panel"
          element={
            <>
            <NavAdmin />
            <Sidebar />
              <Panel />
              
            </>
          }
        /> */}

        <Route
          path="/login"
          element={
            <>
              <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <Login />
              <Footer />
            </>
          }
        />

        <Route
          path="/nosotros"
          element={
            <>
              <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <Nosotros />

              <Footer />
            </>
          }
        />

        <Route
          path="/contacto"
          element={
            <>
              <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <Contacto />
              <Footer />
            </>
          }
        />
        <Route
          path="/precompra"
          element={
            <>
              <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <PreCompra allProducts={allProducts} />
              <Footer />
            </>
          }
        />
        <Route
          path="/compra"
          element={
            <>
              <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
             <Compra allProducts={allProducts} limpiarCarrito={limpiarCarrito} />

              <Modals />
              <Footer />
            </>
          }
        />
        <Route
          path="/Catalogo"
          element={
            <>
              <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />

              <Productos
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <Footer />
            </>
          }
        />

        <Route
          path="/Perfil"
          element={
            <>
              <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <LlenarDatos />
              <Footer />
            </>
          }
        />
        <Route
          path="/personalizar"
          element={
            <>
              <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <Personalizar
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <Footer />
            </>
          }
        />

        <Route
          path="/Detalle/:id_ancheta"
          element={
            <>
              <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <VerDetalle
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
