import React from "react";
import { useEffect, useState } from "react";
import "./InputSearch.css";
function InputSearch({ filterCountries }) {
  const [inputValue, setInputValue] = useState("");
  const filterList = (e) => {
    e.preventDefault();
    filterCountries(e.target.value);
  };
  return (
    <div className="input">
      <label htmlFor="">Buscar Pais: </label>
      <input type="text" onChange={(e) => filterList(e)} />
    </div>
  );
}

export default InputSearch;
