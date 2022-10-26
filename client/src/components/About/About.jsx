import React from "react";
import NavBar from "../NavBar/NavBar";

const About = () => {
  return (
    <>
      <NavBar />
      <div>
        <h1>PI - Dogs</h1>
        <p>
          Este proyecto es parte de la educación en el bootcamp de Full Stack
          Developer de Soy Henry, esta single page aplicacion(SPA) consume datos
          de la api de perros. Es posible con esta aplicacion crear una nueva
          raza de perro, ordenarlas albafeticamente,por peso y hasta por donde
          fueron creadas. Tambien es posible filtrar las razas por sus
          respectivos temperamentos.
        </p>
        <p>
          Si tienes algun consejo de como mejorar esta aplicación no dudes en
          hacermelo saber.
        </p>
        <h2>Tecnologias usadas:</h2>
        <div className="container_tecs">
          <div>HTML</div>
          <div>CSS</div>
          <div>SASS</div>
          <div>JavaScript</div>
          <div>React</div>
          <div>Redux</div>
          <div>Express</div>
          <div>PostgreSQL</div>
        </div>

        <h3>Contacto</h3>
        <div className="social_medias">
          <p>Linkedin</p>
          <p>GitHub</p>
        </div>

        <h3>Email:</h3>
        <p>raulereno@gmail.com</p>
      </div>
    </>
  );
};

export default About;
