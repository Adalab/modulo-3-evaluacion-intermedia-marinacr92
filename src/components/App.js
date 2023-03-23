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
  const [completed, setCompleted] = useState(false);

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
      .filter((eachObject) =>
        eachObject.quote.toLowerCase().includes(inputQuote.toLowerCase())
      )
      .filter((eachObject) => {
        if (selectCharacter === 'Todos') {
          return true;
        } else {
          return eachObject.character === selectCharacter;
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

  const handleAddNewQuote = () => {
    if (newObject.quote !== '' && newObject.character !== '') {
      setData([...data, newObject]);
      setNewObject({ quote: '', character: '' });
      setCompleted(false);
    } else {
      setCompleted(true);
    }
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
      <header>
        <h1 className="header">FRIENDS</h1>
      </header>
      <main>
        <section>
          <form action="" onSubmit={handleSubmit} className="form">
            <legend className="legend">Frases de Friends</legend>
            <hr className="line" />
            <label htmlFor="" className="label">
              Filtrar por frase
            </label>
            <input type="text" value={inputQuote} onInput={handleInputQuote} />
            <label htmlFor="" className="label">
              Filtrar por personaje
            </label>
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
          <form action="" onSubmit={handleSubmit} className="form">
            <legend className="legend">Añadir una nueva frase</legend>
            <hr className="line" />
            <label htmlFor="" className="label">
              Frase
            </label>
            <input
              type="text"
              id="quote"
              placeholder="Ej: Smelly cat, smelly cat..."
              onInput={handleNewQuote}
              value={newObject.quote}
            />
            <label htmlFor="" className="label">
              Personaje
            </label>
            <input
              type="text"
              id="character"
              placeholder="Ej: Phoebe, Joey, Rachel..."
              onInput={handleNewQuote}
              value={newObject.character}
            />
            <input
              type="button"
              className="button"
              value="Añadir una nueva frase"
              onClick={handleAddNewQuote}
            />
          </form>
          <p className={completed ? 'error-msg' : 'hidden'}>
            Por favor, rellene ambos campos
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
