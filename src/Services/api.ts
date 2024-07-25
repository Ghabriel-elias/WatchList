import axios from "axios";

// baseUrl:  https://sujeitoprogramador.com/
//Rota:  r-api/?api=filmes

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGZmYTVhMGExZTExODVmYjg1ZGI2YTA1Y2ZkMzhiOCIsIm5iZiI6MTcyMTg2ODEzNC41NzgyOSwic3ViIjoiNjVhYWFhYjdlMjY3ZGUwMTJiYTMyM2VmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.NRrget2JPg3CIBmqa3YWlyrg_icelu_1OHHtQLPsHZ8'
  }
})

export default api