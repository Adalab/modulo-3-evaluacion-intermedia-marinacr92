// Fichero src/services/api.js
const callToApi = () => {
  return fetch(
    'https://https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json.dev/api/people/5'
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default callToApi;
