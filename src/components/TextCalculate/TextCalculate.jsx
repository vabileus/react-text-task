import React from "react";
import useTextCalculate from "./useTextCalculate";

import styles from "./TextCalculate.module.css";

export const TextCalculate = () => {
  const {
    values,
    price,
    time,
    handleTextChange,
    handleSelect,
  } = useTextCalculate();

  return (
    <div className={styles.container}>
      <form>
        <ul className={styles["flex-outer"]}>
          <li>
            <label>Текст</label>
            <textarea
              name="text"
              rows="30"
              onChange={handleTextChange}
              value={values.text}
              placeholder="Ваш текст"
            ></textarea>
          </li>
          <li>
            <p>Язык</p>
            <ul className={styles["flex-inner"]}>
              <select
                name="language"
                onChange={handleSelect}
                value={values.language}
                className={styles["select-css"]}
              >
                <option>Выберите язык</option>
                <option value="en">Англиский</option>
                <option value="ru">Русский</option>
                <option value="ua">Украинский</option>
              </select>
            </ul>
          </li>
          <li>
            <p>Цена: {!price ? 0 : price} грн</p>
            <p>{!time ? "" : "Дата: " + time}</p>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default TextCalculate;
