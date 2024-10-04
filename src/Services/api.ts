import axios from "axios";

// baseUrl:  https://sujeitoprogramador.com/
//Rota:  r-api/?api=filmes
// apiKEy: 00ffa5a0a1e1185fb85db6a05cfd38b8
// token de leitura: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGZmYTVhMGExZTExODVmYjg1ZGI2YTA1Y2ZkMzhiOCIsIm5iZiI6MTcyNzk4MzQzMS43NjE5NzksInN1YiI6IjY1YWFhYWI3ZTI2N2RlMDEyYmEzMjNlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oFjhYdRIij4hYdz7H4fLqbxJ21xtkKDxFo6K0eTkLLA

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

export async function getGenres(showType: 'movie') {
  try {
    const {data} = await api.get('/genre/movie/list?language=pt-BR')
    return data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao buscar gêneros, por favor tente novamente')

  }
}
export async function getPopularShows() {
  try {
    const {data} = await api.get('/movie/popular?language=pt-BR&page=1')
    return data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao buscar gêneros, por favor tente novamente')
  }
}

export async function getShowsByGenreRequest(typeOfShow: 'movies' | 'series', genre: string) {
  try {
    const url = `/api/${typeOfShow}/${genre}`
    const {data} = await api.get(url)
    return data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao buscar gêneros, por favor tente novamente')
  }
}

export default api