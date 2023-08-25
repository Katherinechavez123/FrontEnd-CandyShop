import { Routes, Route} from "react-router-dom";
import Home from "./components/home/home";
import Personalizar from './components/Personalizar/Personalizar'
import Productos from "./components/productos/Productos";
import Nosotros from './components/nosotros/Nosotros'
import Navbar from "./components/navbar/Navbar";
import Contacto from './components/contacto/Contacto'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={Home} />
        <Route path="/personalizar" element={Personalizar} />
        {/* <Route path="/productos" component={Productos} />
        <Route path="/nosotros" component={Nosotros} />
        <Route path="/contacto" component={Contacto} /> */}
      </Routes>    
    </>
  );
}

export default App;
