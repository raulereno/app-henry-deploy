import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDog, getDog } from "../../actions";
import Loader from "../Loader/Loader";
import NavBar from "../NavBar/NavBar";

const DetailsDogs = ({ match }) => {
  const dispatch = useDispatch();
  const param = match.params.breed;
  const dog = useSelector((state) => state.dog);
  useEffect(() => {
    dispatch(getDog(param));

    return function cleanup() {
      dispatch(cleanDog());
    };
  }, [dispatch, param]);
  return (
    <>
      <NavBar />
      {Object.keys(dog).length !== 0 ? (
        <div className="detailDog">
          <img src={dog.image} alt="" />
          <div>
            <h2>{dog.name}</h2>
            <h3>Temperamentos</h3>
            <p>
              <span>{dog.temperament}</span>
            </p>
            <p>
              Altura: <span>{dog.height} cm</span>
            </p>
            <p>
              Peso: <span>{dog.weight} kg</span>
            </p>
            <p>
              Esperanza de vida:{" "}
              {dog.life_span?.includes("years") ? (
                <span>{dog.life_span}</span>
              ) : (
                <span>{dog.life_span} years</span>
              )}
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DetailsDogs;
