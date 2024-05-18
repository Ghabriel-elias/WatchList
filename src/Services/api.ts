import axios from "axios";

// baseUrl:  https://sujeitoprogramador.com/
//Rota:  r-api/?api=filmes

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
  }
})

export default api