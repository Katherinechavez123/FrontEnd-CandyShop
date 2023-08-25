import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>      
      <ul className='w-full flex justify-center m-4'>
        <li className='mx-2 text-2xl text-slate-600'><Link to="/">Inicio</Link></li>
        <li className='mx-2 text-2xl text-slate-600'><NavLink to="/personalizar">Personalizar</NavLink></li>
        <li className='mx-2 text-2xl text-slate-600'><NavLink className='text-blue-600' to="/edwincito">Edwincito</NavLink></li>
        {/* <li className='mx-2 text-2xl text-slate-600'><NavLink to="/catalogo">Tienda</NavLink></li>
        <li className='mx-2 text-2xl text-slate-600'><NavLink to="/nosotros">Nosotros</NavLink></li>
        <li className='mx-2 text-2xl text-slate-600'><NavLink to="/contacto">Contacto</NavLink></li> */}
      </ul>
    </nav>
  )
}


