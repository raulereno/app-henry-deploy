import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterDogsByCreation,
  filterDogsByLetter,
  filterDogsByTemps,
  filterDogsByWeight,
  getDogs,
  getTempes,
} from "../../actions";

const Filters = ({ paginado, setRefresh }) => {
  const dispatch = useDispatch();
  const tempes = useSelector((state) => state.tempes);
  const [selectedTemps, setSelectedTemps] = useState([]);

  const [filters, setFilters] = useState({
    createdIn: "all",
    ordenatedByLetter: "",
    ordenatedByWeight: "",
    tempes: "",
  });

  useEffect(() => {
    dispatch(getTempes());
  }, [dispatch]);

  const handlerChange = (event) => {
    //ESTO TIENE QUE SER CON EL NAME Y EL VALUE SE LO PASA EN OTRO ARGUMENTO
    let value = event.target.value;
    let name = event.target.name;

    switch (name) {
      case "createdIn":
        value === "all"
          ? dispatch(getDogs())
          : dispatch(filterDogsByCreation(value));
        break;
      case "ordenatedByLetter":
        dispatch(filterDogsByLetter(value));
        break;
      case "tempes":
        value === "all"
          ? dispatch(getDogs())
          : dispatch(filterDogsByTemps(value));
        break;
      case "ordenatedByWeight":
        dispatch(filterDogsByWeight(value));
        break;
      default:
        break;
    }
    setRefresh(value);
    paginado(1);
    setFilters({ ...filters, [name]: value });

    if (name === "tempes" && value !== "all") {
      setSelectedTemps([...selectedTemps, value]);
    } else if (name === "tempes" && value === "all") {
      setSelectedTemps([]);
    }
  };
  const refresh = () => {
    dispatch(getDogs());
    setSelectedTemps([]);
    setFilters({
      createdIn: "all",
      ordenatedByLetter: "",
      ordenatedByWeight: "",
      tempes: "",
    });
  };
  return (
    <div className="container_filters">
      <div className="orders">
        <h3>Ordenar</h3>
        <div>
          <p>Alfabeticamente</p>
          <select
            name="ordenatedByLetter"
            id="ordenatedByLetter"
            onChange={handlerChange}
            value={filters.ordenatedByLetter}
          >
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
        </div>

        <div>
          <p>Por peso</p>
          <select
            name="ordenatedByWeight"
            id="ordenatedByWeight"
            onChange={handlerChange}
            value={filters.ordenatedByWeight}
          >
            <option>-</option>
            <option value={"heavys"}>Mas pesados</option>
            <option value={"light"}>Mas livianos</option>
          </select>
        </div>
        <div>
          <p>Creaci??n</p>
          <select
            name="createdIn"
            id="createdIn"
            onChange={handlerChange}
            value={filters.createdIn}
          >
            <option value="all">Todos</option>
            <option value="dataBase">Base de Datos</option>
            <option value="API">API</option>
          </select>
        </div>
      </div>
      <div className="filter">
        <h3>Filtrar</h3>
        {selectedTemps &&
          selectedTemps?.map((e) => {
            return <span key={e}>{e}</span>;
          })}
        <select
          name="tempes"
          id="tempes"
          onChange={handlerChange}
          value={filters.tempes}
        >
          <option defaultValue="">Temperamentos</option>
          <option value="all">Todos</option>
          {tempes &&
            tempes.map((e) => {
              return (
                <option key={e.id} value={`${e.name}`}>
                  {e.name}
                </option>
              );
            })}
        </select>
      </div>

      <button
        className="refresh"
        onClick={() => {
          refresh();
        }}
      >
        Refresh
      </button>
    </div>
  );
};

export default Filters;
