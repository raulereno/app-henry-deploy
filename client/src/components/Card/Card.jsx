import React from "react";
import { Link } from "react-router-dom";

const Card = ({ image, name, temperament, weight }) => {
  return (
    <Link to={`/dogs/${name}`}>
      <div>
        {
          <>
            <img src={image} alt="" width={"300px"} />
            <p>{name}</p>
            <p>{temperament}</p>
            <p>{weight}</p>
          </>
        }
      </div>
    </Link>
  );
};

export default Card;
