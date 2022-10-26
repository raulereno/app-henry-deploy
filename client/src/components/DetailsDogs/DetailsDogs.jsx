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
      //dispatch de la funcion clean
      dispatch(cleanDog());
    };
  }, [dispatch, param]);
  console.log(dog);
  return (
    <>
      <NavBar />
      {dog && (
        <div className="detailDog">
          <img src={dog.image} alt="" />
          <div>
            <h2>{dog.name}</h2>
            <h3>Temperamentos</h3>
            <p>
              <span>{dog.temperament}</span>
            </p>
            <p>
              Altura: <span>{dog.height}</span>
            </p>
            <p>
              Peso: <span>{dog.weight}</span>
            </p>
            <p>
              Esperanza de vida: <span>{dog.life_span}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsDogs;
