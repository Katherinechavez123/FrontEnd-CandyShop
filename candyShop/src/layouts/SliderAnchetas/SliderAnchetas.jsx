import React, { useState, useEffect } from 'react';
import "./SliderAnchetas.css";
import axios from 'axios';
import endPoints from '../../services/api';


const SliderAnchetas = () => {
  const [anchetas, setAnchetas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function getAnchetas() {
    try {
      const response = await axios.get(endPoints.anchetas.getAnchetas);
      setAnchetas(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }

  useEffect(() => {
    getAnchetas();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === anchetas.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? anchetas.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="product-slider">
      <button className="slider-button prev" onClick={prevSlide}>
        &lt;
      </button>
      <div className="slider-content">
        {anchetas.map((ancheta, index) => (
          <div
            key={index}
            className={`product-slide ${
              index === currentIndex ? 'active' : ''
            }`}
          >
            <img
              src={ancheta.url_imagen_ancheta}
              alt={ancheta.nombre_ancheta}
            />
            <h3>{ancheta.nombre_ancheta}</h3>
            <p>${ancheta.valor_ancheta}</p>
          </div>
        ))}
      </div>
      <button className="slider-button next" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};

export default SliderAnchetas;
