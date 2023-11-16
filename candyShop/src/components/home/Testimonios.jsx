import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "./Flechas";

export default function Testimonios() {
  const [comentarios, setComentarios] = useState([
    {
      id: 1,
      autor: "Juan Pérez",
      ocupación: "Diseñador Gráfico",
      texto:
        "Estoy muy satisfecho con los productos y servicios de Candy Shop. La calidad de los dulces es excepcional, y el proceso de compra en línea es muy conveniente.",
      imagen: "https://www.famousbirthdays.com/faces/p--rez-juan-image.jpg",
    },
    {
      id: 2,
      autor: "Ana Gómez",
      ocupación: "Estudiante",
      texto:
        "He comprado en Candy Shop varias veces y siempre he tenido una experiencia fantástica. Los precios son competitivos y la variedad de productos es impresionante.",
      imagen: "https://cflvdg.avoz.es/sc/480x/default/2022/08/08/00121659970456391990917/Foto/anagomez_psicologa.png",
    },
    {
      id: 3,
      autor: "Luis Martínez",
      ocupación: "Chef Pastelero",
      texto:
        "Como chef pastelero, Candy Shop es mi lugar de referencia para ingredientes de alta calidad. Sus productos son frescos y deliciosos, ¡y la entrega es rápida!",
      imagen: "https://www.publimetro.co/resizer/9L8TW7GeO-hkBLk4VedaWhxZMNg=/1024x1024/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/GQKY6S3H4FBBZO2AB4ULIGPKUI.jpg",
    },
    {
      id: 4,
      autor: "Patricia Teherán",
      ocupación: "Cantante",
      texto:
        "Siempre recomiendo Candy Shop a mis amigos y clientes. Los productos son perfectos para regalos y eventos especiales. Además, la presentación es impecable.",
      imagen: "https://caracoltv.brightspotcdn.com/dims4/default/89c9711/2147483647/strip/false/crop/638x425+0+0/resize/1200x799!/quality/90/?url=https%3A%2F%2Fcaracol-brightspot.s3-us-west-2.amazonaws.com%2Fassets%2Fcaracoltv%2Fpatricia_1.jpg",
    },
    {
      id: 5,
      autor: "Carlos Fernández",
      ocupación: "Ingeniero",
      texto:
        "Candy Shop ofrece una amplia variedad de productos que van desde chocolates hasta gomitas. La navegación en el sitio web es fácil, y la entrega es puntual. ¡Excelente servicio!",
      imagen: "data:image/jpeg;base64,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",
    },
   ]);


  const [newComment, setNewComment] = useState({
    autor: "",
    ocupación: "",
    texto: "",
    imagen: "https://www.asofiduciarias.org.co/wp-content/uploads/2018/06/sin-foto.png",
  });

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleAddComment = () => {
    if (newComment.autor && newComment.ocupación && newComment.texto) {
      const updatedComments = [...comentarios, newComment];
      setComentarios(updatedComments);
      setNewComment({
        autor: "",
        ocupación: "",
        texto: "",
        imagen: "",
      });
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="relative isolate overflow-hidden bg-white px-6 pb-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-fuchsia-950 sm:text-5xl text-center -mt-12">
          Comentarios
        </h2>
        
        <Slider {...settings}>
          {comentarios.map((comentario) => (
            <div key={comentario.id} className="mt-10 bg-fuchsia-200 p-20 rounded-md">
              <blockquote className="text-center text-xl font-normal leading-8 text-fuchsia-950 sm:text-xl sm:leading-9">
                <p>{comentario.texto}</p>
              </blockquote>
              <figcaption className="mt-4">
                <img
                  className="mx-auto h-20 w-20 rounded-full"
                  src={comentario.imagen}
                  alt={comentario.autor}
                />
                <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                  <div className="font-semibold text-fuchsia-950">{comentario.autor}</div>
                  <svg
                    viewBox="0 0 2 2"
                    width={3}
                    height={3}
                    aria-hidden="true"
                    className="fill-cyan-300"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <div className="text-fuchsia-950">{comentario.ocupación}</div>
                </div>
              </figcaption>
            </div>
          ))}
        </Slider>
      </div>

      <div className=" bg-fuchsia-200 mr-72 rounded-md ml-72 pl-14 pr-14 pt-5 pb-5 mt-9">
        <h3 className="text-2xl font-bold text-fuchsia-950 mb-4 text-center">Deja tu comentario</h3>
        <div className="mb-4">
        <label className="text-fuchsia-950 font-semibold block">Nombre del autor</label>
          <input
            type="text"
            name="autor"
            value={newComment.autor}
            onChange={handleCommentChange}
            className="w-full border rounded-xl py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="text-fuchsia-950 font-semibold block">Ocupación</label>
          <input
            type="text"
            name="ocupación"
            value={newComment.ocupación}
            onChange={handleCommentChange}
            className="w-full border rounded-xl py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="text-fuchsia-950 font-semibold block">Comentario</label>
          <textarea
            name="texto"
            value={newComment.texto}
            onChange={handleCommentChange}
            className="w-full border rounded-xl py-2 px-3 h-24"
          />
        </div>
        <button onClick={handleAddComment} className="bg-pink-600 text-white py-2 px-4 rounded-full hover:bg-cyan-300 hover:text-black">
          Agregar Comentario
        </button>
      </div>
    </section>
  );
}
