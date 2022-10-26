import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

const Cards = ({ dogs }) => {
  const notFound = useSelector((state) => state.notFound);
  if (notFound) {
    return <h2>Raza no encontrada</h2>;
  }
  return (
    <div className="cards">
      {dogs.length &&
        dogs.map((e) => {
          return (
            <Card
              image={e.image}
              name={e.name}
              temperament={e.temperament}
              weight={e.weight}
              key={e.id}
              id={e.id}
            />
          );
        })}
    </div>
  );
};

export default Cards;
