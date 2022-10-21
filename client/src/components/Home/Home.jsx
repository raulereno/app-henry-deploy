import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTempes, getDogs } from "../../actions";
import Search from "../Search/Search";
import Cards from "./../Cards/Cards";

const Home = () => {
  const dispatch = useDispatch();

  const tempes = useSelector((state) => state.tempes);
  const dogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getTempes());
    dispatch(getDogs());
  }, []);

  return (
    <>
      <div>
        <Search />
        <select name="createdIn" id="createdIn">
          <option value="dataBase">Base de Datos</option>
          <option value="API">API</option>
        </select>
        <select name="" id="">
          {tempes &&
            tempes.map((e) => {
              return (
                <option key={e.id} value={`${e.id}`}>
                  {e.name}
                </option>
              );
            })}
        </select>
      </div>
      <Cards dogs={dogs} />
    </>
  );
};

export default Home;
