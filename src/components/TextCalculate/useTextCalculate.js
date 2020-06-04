import { useState } from "react";
import TimerFactory from "working-times";
import VALID_TIMER_CONFIG from "./workingDays";

const calculatePrice = (textSize, language) => {
  let price = 0;

  if (textSize > 0) {
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
  }

  return Math.round((price + Number.EPSILON) * 100) / 100;
};

const calculateTime = (textSize, language) => {
  if (textSize === 0) {
    return null;
  }
  var options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timezone: "UTC",
  };

  const timer = TimerFactory.getTimerInstance();

  timer
    .setConfigAsync(VALID_TIMER_CONFIG)
    .then((t) => {
      console.log(t.getBufferedCalendar);
    })
    .catch((e) => {
      console.log(e.message);
    });

  let totalMin = 0;

  switch (language) {
    case "en":
      totalMin = 30 + textSize / 5.55;
      break;
    case "ru":
      totalMin = 30 + textSize / 22.22;
      break;
    case "ua":
      totalMin = 30 + textSize / 22.22;
      break;
    default:
      return null;
  }

  if (totalMin < 60) {
    totalMin = 60;
  }

  return timer
    .add(new Date(), totalMin, "MINUTES")
    .toLocaleString("ru", options);
};

const textSize = (text) => {
  return !text ? 0 : text.length;
};

const useTextCalculate = () => {
  const [values, setValues] = useState({});
  const [price, setPrice] = useState();
  const [time, setTime] = useState();

  const handleTextChange = (event) => {
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

  return { values, price, time, handleTextChange, handleSelect };
};

export default useTextCalculate;
