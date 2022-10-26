export const validate = (input) => {
  let errors = {};
  if (!input.name) {
  } else if (!/^[A-Z]+$/i.test(input.name)) {
    errors.name = "El nombre de la raza no puede contener numeros";
  }
  if (!input.height_min || !input.height_max) {
  } else if (
    !/^\d+$/i.test(input.height_min) ||
    !/^\d+$/i.test(input.height_max)
  ) {
    errors.height = "El valor de la altura debe ser un numero";
  }

  if (!input.weight_min || !input.weight_max) {
  } else if (
    !/^\d+$/i.test(input.weight_min) ||
    !/^\d+$/i.test(input.weight_max)
  ) {
    errors.weight = "El valor del peso debe ser un numero";
  }
  return errors;
};

export const validateForm = (form) => {
  let errors = {};
  console.log(form);
  if (!form.name) {
    errors.name = "Nombre de la raza requerido";
  }

  if (!form.height_min || !form.height_max) {
    errors.height = "Altura requerida";
  } else if (form.height_min >= form.height_max) {
    errors.height = "El minimo debe ser menor que el maximo";
  }
  if (!form.weight_min || !form.weight_max) {
    errors.weight = "Peso requerido";
  } else if (form.weight_min >= form.weight_max) {
    errors.weight = "El minimo debe ser menor que el maximo";
  }
  if (!form.life_span) {
    errors.life_span = "La esperanza de vida es requerida";
  }
  if (!form.image) {
    errors.image = "Url de imagen requerida";
  }
  if (form.temperaments.length < 1) {
    errors.temperaments = "Es requerido ingresar al menos un temperamento";
  }
  console.log(errors);
  return errors;
};

export const formatFormToSend = (form) => {
  console.log(form);
  return {
    name: form.name,
    height: `${form.height_min} - ${form.height_max}`,
    weight: `${form.weight_min} - ${form.weight_max}`,
    life_span: form.life_span,
    image: form.image,
    temperaments: form.temperaments,
  };
};
