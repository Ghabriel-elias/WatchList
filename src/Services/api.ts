import axios from "axios";

// baseUrl:  https://sujeitoprogramador.com/
//Rota:  r-api/?api=filmes

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGZmYTVhMGExZTExODVmYjg1ZGI2YTA1Y2ZkMzhiOCIsInN1YiI6IjY1YWFhYWI3ZTI2N2RlMDEyYmEzMjNlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.61wYB_W4-ttPWSTasq85CurXcUnyv3SsmPEPVWPrKjM'
  }
})

export default api