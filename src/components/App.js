import '../styles/App.scss';
import callToApi from '../services/Api';
import { useEffect, useState } from 'react';
import dataJSON from '../data.json';

function App() {
  const [data, setData] = useState(dataJSON);
  const [inputQuote, setInputQuote] = useState('');
  const [selectCharacter, setSelectCharacter] = useState('Todos');

  // useEffect(() => {
  //   callToApi().then((responseData) => {
  //     console.log(responseData);
  //     setData(responseData);
  //   });
  // }, [data]);

  const renderList = () => {
    return data
      .filter((eachObject) => {
        if (inputQuote === '' && selectCharacter === 'Todos') {
          return data;
        } else if (inputQuote === '' && selectCharacter !== 'Todos') {
          return eachObject.character === selectCharacter;
        } else if (inputQuote !== '' && selectCharacter === 'Todos') {
          return eachObject.quote
            .toLowerCase()
            .includes(inputQuote.toLowerCase());
        } else {
          return (
            eachObject.character === selectCharacter &&
            eachObject.quote.toLowerCase().includes(inputQuote.toLowerCase())
          );
        }
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
          <select name="" id="" onChange={handleSelectCharacter}>
            <option value="Todos">Todos</option>
            <option value="Ross">Ross</option>
            <option value="Monica">Mónica</option>
            <option value="Joey">Joey</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Chandler">Chandler</option>
            <option value="Rachel">Rachel</option>
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
