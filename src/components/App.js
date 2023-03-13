import '../styles/App.scss';
import callToApi from '../services/Api';
import { useEffect, useState } from 'react';
import dataJSON from '../data.json';

function App() {
  const [data, setData] = useState(dataJSON);
  const [inputQuote, setInputQuote] = useState('');
  const [selectCharacter, setSelectCharacter] = useState('');

  // useEffect(() => {
  //   callToApi().then((responseData) => {
  //     console.log(responseData);
  //     setData(responseData);
  //   });
  // }, []);

  // const renderList = () => {
  //   return data
  //     .filter((eachObject) => {
  //       return eachObject.quote
  //         .toLowerCase()
  //         .includes(inputQuote.toLowerCase());
  //     })
  //     .map((eachObject, index) => {
  //       return (
  //         <li key={index} className="card">
  //           <p>{eachObject.quote}</p>
  //           <p className="characters">{eachObject.character}</p>
  //         </li>
  //       );
  //     });
  // };

  const renderList = () => {
    return data
      .filter((eachObject) => {
        return eachObject.character === selectCharacter;
      })
      .map((eachObject, index) => {
        return (
          <li key={index} className="card">
            <p>{eachObject.quote}</p>
            <p className="characters">{eachObject.character}</p>
          </li>
        );
      });
  };

  const handleInputQuote = (ev) => {
    setInputQuote(ev.target.value);
  };

  const handleSelectCharacter = (ev) => {
    setSelectCharacter(ev.target.value);
  };

  return (
    <div className="App">
      <header>
        <h1>Frases de Friends</h1>
        <form action="">
          <label htmlFor="">Filtrar por frase</label>
          <input type="text" value={inputQuote} onInput={handleInputQuote} />
          <label htmlFor="">Filtrar por personaje</label>
          <select name="" id="">
            <option value="todos" onChange={handleSelectCharacter}>
              Todos
            </option>
            <option value="ross" onChange={handleSelectCharacter}>
              Ross
            </option>
            <option value="monica" onChange={handleSelectCharacter}>
              Mónica
            </option>
            <option value="joey" onChange={handleSelectCharacter}>
              Joey
            </option>
            <option value="phoebe" onChange={handleSelectCharacter}>
              Phoebe
            </option>
            <option value="chandler" onChange={handleSelectCharacter}>
              Chandler
            </option>
            <option value="rachel" onChange={handleSelectCharacter}>
              Rachel
            </option>
          </select>
        </form>
      </header>
      <main>
        <ul className="list">{renderList()}</ul>
      </main>
    </div>
  );
}

export default App;
