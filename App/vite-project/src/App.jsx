import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import InputSearch from "./InputSearch";

function App() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const filterCountries = (value) => {
    let filteredCountries = [...list];
    filteredCountries = filteredCountries.filter(
      (el) => el.Entity.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setFilteredList(filteredCountries);
  };

  const orderAscHeight = () => {
    let orderHeight = [...list];
    let result = orderHeight.sort(
      (a, b) => a.mean_male_height - b.mean_male_height
    );
    setFilteredList(result);
  };

  const orderDescHeight = () => {
    let orderHeight = [...list];
    let result = orderHeight.sort(
      (a, b) => b.mean_male_height - a.mean_male_height
    );
    setFilteredList(result);
  };

  useEffect(() => {
    const getList = async () => {
      const result = await axios.get("http://127.0.0.1:8000/posts");
      setList(JSON.parse(result.data).data);
      setFilteredList(JSON.parse(result.data).data);
    };

    getList();
  }, []);

  return (
    <div className="App">
      <h2>Altura promedio máxima por pais</h2>
      <InputSearch filterCountries={filterCountries}></InputSearch>
      <button onClick={orderAscHeight}>Ordenar altura ascendentemente</button>
      <button onClick={orderDescHeight}>Ordenar altura descendentemente</button>
      <table className="table">
        <thead>
          <tr className="headers">
            <th>Country</th>
            <th>Mean Male Height</th>
          </tr>
        </thead>
        <tbody>
          {filteredList?.map((item, index) => (
            <tr className="table-data" key={index}>
              <td>{item.Entity}</td>
              <td>{Math.round(item.mean_male_height)} cm</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
