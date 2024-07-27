import axios from "axios";

// baseUrl:  https://sujeitoprogramador.com/
//Rota:  r-api/?api=filmes

const api = axios.create({
  // baseURL: 'http://192.168.100.115:3000'
})

export default api