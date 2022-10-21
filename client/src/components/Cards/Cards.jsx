import React from "react";

import Card from "../Card/Card";

const Cards = ({ dogs }) => {
  return (
    <div>
      {dogs &&
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
