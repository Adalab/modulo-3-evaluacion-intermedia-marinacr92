import '../styles/App.scss';
import callToApi from '../services/Api';
import ls from '../services/localStorage';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(ls.get('data', []));
  const [inputQuote, setInputQuote] = useState('');
  const [selectCharacter, setSelectCharacter] = useState('Todos');
  const [newObject, setNewObject] = useState({
    quote: '',
    character: '',
  });

  useEffect(() => {
    if (!data || data.length === 0) {
      callToApi().then((responseData) => {
        setData(responseData);
      });
    }
  }, []);

  useEffect(() => {
    ls.set('data', data);
  }, [data]);

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

  const handleNewQuote = (ev) => {
    setNewObject({
      ...newObject,
      [ev.target.id]: ev.target.value,
    });
  };

  const handleAddNewQuote = (ev) => {
    setData([...data, newObject]);
    setNewObject({ quote: '', character: '' });
  };

  const handleInputQuote = (ev) => {
    setInputQuote(ev.target.value);
  };

  const handleSelectCharacter = (ev) => {
    setSelectCharacter(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <div className="App">
      <header></header>
      <main>
        <section>
          <form action="" onSubmit={handleSubmit}>
            <legend>Frases de Friends</legend>
            <label htmlFor="">Filtrar por frase</label>
            <input type="text" value={inputQuote} onInput={handleInputQuote} />
            <label htmlFor="">Filtrar por personaje</label>
            <select name="" id="" onChange={handleSelectCharacter}>
              <option value="Todos">Todos</option>
              <option value="Ross">Ross</option>
              <option value="Monica">Monica</option>
              <option value="Joey">Joey</option>
              <option value="Phoebe">Phoebe</option>
              <option value="Chandler">Chandler</option>
              <option value="Rachel">Rachel</option>
            </select>
          </form>
        </section>
        <section>
          <ul className="list">{renderList()}</ul>
        </section>
        <section>
          <form action="" onSubmit={handleSubmit}>
            <legend>Añadir una nueva frase</legend>
            <label htmlFor="">Frase</label>
            <input
              type="text"
              id="quote"
              placeholder="Ej: Smelly cat, smelly cat..."
              onInput={handleNewQuote}
              value={newObject.quote}
            />
            <label htmlFor="">Personaje</label>
            <input
              type="text"
              id="character"
              placeholder="Ej: Phoebe, Joey, Rachel..."
              onInput={handleNewQuote}
              value={newObject.character}
            />
            <input
              type="button"
              value="Añadir una nueva frase"
              onClick={handleAddNewQuote}
            />
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
