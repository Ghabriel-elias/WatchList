import axios from "axios";

// baseUrl:  https://sujeitoprogramador.com/
//Rota:  r-api/?api=filmes

const api = axios.create({
  baseURL: 'http://192.168.100.115:3000'
})

export async function getGenresRequest() {
  try {
    const {data} = await api.get('/api/genres')
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

export async function deleteUserRequest(token: string) {
  try {
    const {data} = await api.delete('/auth/delete', {
      headers: {
        Authorization: token
      }
    })
    return data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao buscar gêneros, por favor tente novamente')
  }
}

export default api