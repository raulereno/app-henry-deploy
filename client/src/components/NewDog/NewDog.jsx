import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTempes } from "../../actions";
import NavBar from "../NavBar/NavBar";
import { formatFormToSend, validate, validateForm } from "./validate";
import dogPaw from "./dogPaw.svg";

const NewDog = () => {
  const tempes = useSelector((state) => state.tempes);
  const dispatch = useDispatch();
  const [swap, setSwap] = useState(true);

  const [form, setForm] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  const [errors, setErrors] = useState({});

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "name":
        setForm({ ...form, name: value });
        break;
      case "height_min":
        setForm({ ...form, height_min: value });
        break;
      case "height_max":
        setForm({ ...form, height_max: value });
        break;
      case "weight_min":
        setForm({ ...form, weight_min: value });
        break;
      case "weight_max":
        setForm({ ...form, weight_max: value });
        break;
      case "life_span":
        setForm({ ...form, life_span: value });
        break;
      case "image":
        setForm({ ...form, image: value });
        break;
      case "temperaments":
        !form.temperaments?.includes(value) &&
          setForm({ ...form, temperaments: [...form.temperaments, value] });

        break;

      default:
        break;
    }
    setErrors(validate({ ...form, [name]: value }));
    console.log(errors);
    setSwap(false);
  };

  const clean = () => {
    setForm({
      name: "",
      height_min: "",
      height_max: "",
      weight_min: "",
      weight_max: "",
      life_span: "",
      image: "",
      temperaments: [],
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let aux = validateForm(form);

    if (Object.keys(aux).length) {
      setErrors(aux);
      setSwap(true);
    } else {
      dispatch(createDog(formatFormToSend(form)));
      alert("Raza creada correctamente");
    }
  };

  const deleteSelectedTemp = (temper) => {
    let filter = form.temperaments.filter((element) => element !== temper);
    setForm({
      ...form,
      temperaments: filter,
    });
  };

  useEffect(() => {
    dispatch(getTempes());
  }, [dispatch]);
  return (
    <>
      <NavBar />
      <div className="container_form">
        <form action="post" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="name">Nombre de la raza:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={changeHandler}
              placeholder="Pithuahua"
              className={errors.name ? "errorInput" : ""}
            />
            {errors.name ? <p className="errorsText">{errors.name}</p> : ""}
          </div>
          <div>
            <label htmlFor="height">Altura:</label>
            <input
              type="text"
              name="height_min"
              value={form.height_min}
              onChange={changeHandler}
              placeholder="Min"
              className={`${"input_num"} ${errors.height ? "errorInput" : ""}`}
            />
            -
            <input
              type="text"
              name="height_max"
              id=""
              placeholder="Max"
              onChange={changeHandler}
              value={form.height_max}
              className={`${"input_num"} ${errors.height ? "errorInput" : ""}`}
            />
            cm
            {errors.height ? <p className="errorsText">{errors.height}</p> : ""}
          </div>
          <div>
            <label htmlFor="weight">Peso</label>
            <input
              type="text"
              name="weight_min"
              value={form.weight_min}
              onChange={changeHandler}
              placeholder="Min"
              className={`${"input_num"} ${errors.weight ? "errorInput" : ""}`}
            />
            -
            <input
              type="text"
              name="weight_max"
              id=""
              placeholder="Max"
              value={form.weight_max}
              onChange={changeHandler}
              className={`${"input_num"} ${errors.weight ? "errorInput" : ""}`}
            />
            kg
            {errors.weight ? <p className="errorsText">{errors.weight}</p> : ""}
          </div>

          <div>
            <label htmlFor="life_span">Esperanza de vida:</label>
            <input
              type="text"
              name="life_span"
              value={form.life_span}
              onChange={changeHandler}
              placeholder="10 - 15"
              className={`${"input_life-span"} ${
                errors.life_span ? "errorInput" : ""
              }`}
            />
            {errors.life_span ? (
              <p className="errorsText">{errors.life_span}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label htmlFor="image">Url img</label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={changeHandler}
              className={errors.image ? "errorInput" : ""}
            />
            {errors.image ? <p className="errorsText">{errors.image}</p> : ""}
          </div>
          <div>
            <p>Temperamento</p>
            <div className="container_selectedTemps">
              {form.temperaments &&
                form.temperaments?.map((temp) => {
                  return (
                    <button
                      key={`${temp}`}
                      onClick={() => deleteSelectedTemp(temp)}
                    >
                      <img src={dogPaw} alt="" className="deleteTemp" />
                      <span className="selectedTemp">{temp}</span>
                    </button>
                  );
                })}
            </div>
            <select
              name="temperaments"
              id=""
              onChange={changeHandler}
              className={errors.temperaments ? "errorInput" : ""}
            >
              {tempes &&
                tempes.map((temp) => {
                  return (
                    <option key={temp.id} value={temp.name}>
                      {temp.name}
                    </option>
                  );
                })}
            </select>
            {errors.temperaments ? (
              <p className="errorsText">{errors.temperaments}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <button
              type="reset"
              onClick={() => {
                clean();
              }}
            >
              Limpiar
            </button>
            <button type="submit" disabled={swap ? true : false}>
              Agregar
            </button>
          </div>
        </form>
        <div className="preview">
          {Object.keys(form).length ? (
            <>
              {form.image && (
                <img src={form.image} alt="" className="img_preview" />
              )}

              <div className="info_preview">
                <h3>{form.name}</h3>
                <p>
                  {form.height_min &&
                    `Altura: ${form.height_min} - ${form.height_max} cm`}{" "}
                </p>
                <p>
                  {form.weight_min &&
                    `Peso: ${form.weight_min} - ${form.weight_max} kg`}{" "}
                </p>
                <p>
                  {form.life_span && `Esperanza de vida: ${form.life_span}`}
                </p>
                <p>
                  {form.temperaments.length !== 0 &&
                    `Temperamentos: ${form.temperaments}`}
                </p>
              </div>
            </>
          ) : (
            <h2>Preview</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default NewDog;
