import { useState } from "react";

const calculatePrice = (textSize, language) => {
  let price = 0;

  switch (language) {
    case "en":
      price = 120 + textSize * 0.12;
      break;
    case "ru":
      price = 50 + textSize * 0.05;
      break;
    case "ua":
      price = 50 + textSize * 0.05;
      break;
    default:
      break;
  }

  return Math.round((price + Number.EPSILON) * 100) / 100;
};

const calculateTime = () => {};

const textSize = (text) => {
  return !text ? 0 : text.length;
};

const useTextCalculate = () => {
  const [values, setValues] = useState({});
  const [price, setPrice] = useState();
  const [time, setTime] = useState();

  const handleChange = (event) => {
    event.persist();

    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));

    setTime(calculateTime(textSize(event.target.value), values.language));
    setPrice(calculatePrice(textSize(event.target.value), values.language));
  };

  const handleSelect = (event) => {
    event.persist();

    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));

    setTime(calculateTime(textSize(values.text), event.target.value));
    setPrice(calculatePrice(textSize(values.text), event.target.value));
  };

  return { values, price, time, handleChange, handleSelect };
};

export default useTextCalculate;
