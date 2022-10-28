import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
      {dog && Object.keys(dog).length !== 0 ? (
        <>
          <Link to={"/dogs"}>
            <button className="buttonBack">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M109.3 288L480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288z" />
              </svg>
            </button>
          </Link>
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
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DetailsDogs;
