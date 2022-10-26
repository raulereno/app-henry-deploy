import React from "react";
import { Link } from "react-router-dom";

const Card = ({ image, name, temperament, weight, id }) => {
  return (
    <div className="card" key={id}>
      <Link to={`/dogs/${name}`}>
        {
          <>
            <img src={image} alt="" width={"300px"} />
            <div>
              <h4>{name}</h4>
              {temperament && (
                <>
                  <h5>Temperamento</h5>
                  <p>{temperament}</p>
                </>
              )}
              <h5>Peso</h5>
              <p>{weight} kg</p>
            </div>
          </>
        }
      </Link>
    </div>
  );
};

export default Card;
