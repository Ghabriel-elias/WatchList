import axios from "axios";
import { API_KEY } from "../../env";

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

const apikey = API_KEY

export async function getGenres(showType: 'movie' | 'tv') {
  try {
    const queryGenres = `/genre/${showType}/list?language=pt-BR`
    const responseGenres = await api.get(queryGenres, {
      params: {
        api_key: apikey
      }
    })
    return responseGenres?.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao buscar gêneros, por favor tente novamente')
  }
}

export async function getSimilar(showType: 'movie' | 'tv', mediaHubId: number) {
  try {
    const queryGenres = `/${showType}/${mediaHubId}/similar?language=pt-BR`
    const responseGenres = await api.get(queryGenres, {
      params: {
        api_key: apikey
      }
    })
    return responseGenres?.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao buscar similares, por favor tente novamente')
  }
}

export async function getVideos(showType: 'movie' | 'tv', mediaHubId: number) {
  try {
    const queryGenres = `/${showType}/${mediaHubId}/videos?language=pt-BR`
    const responseGenres = await api.get(queryGenres, {
      params: {
        api_key: apikey
      }
    })
    return responseGenres?.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao buscar gêneros, por favor tente novamente')
  }
}

export async function searchMediaHub(term: string) {
  try {
    const queryMovies = `/search/movie`
    const querySeries = `/search/tv`
    const responseMovies = await api.get(queryMovies, {
      params: {
        api_key: apikey,
        query: term
      }
    })
    const responseSeries = await api.get(querySeries, {
      params: {
        api_key: apikey,
        query: term
      }
    })
    return {movies: responseMovies?.data?.results, series: responseSeries?.data?.results}
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao buscar gêneros, por favor tente novamente')
  }
}

export async function getTrendingMediaRequest() {
  try {
    const query = `/trending/movie/day?language=pt-BR`
    const response = await api.get(query, {
      params: {
        api_key: apikey,
      }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao buscar gêneros, por favor tente novamente')
  }
}

export async function getWatchProvidersRequest(typeOfShow: 'movie' | 'tv', mediaHubId: number) {
  try {
    const query = `/${typeOfShow}/${mediaHubId}/watch/providers?language=pt-BR`
    const response = await api.get(query, {
      params: {
        api_key: apikey
      }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao buscar provedores, por favor tente novamente')
  }
}

export async function getCastRequest(typeOfShow: 'movie' | 'tv', mediaHubId: number) {
  try {
    const query = `/${typeOfShow}/${mediaHubId}/credits`
    const response = await api.get(query, {
      params: {
        api_key: apikey
      }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao buscar elenco, por favor tente novamente')
  }
}

export async function getMediaHubDetailsRequest(typeOfShow: 'movie' | 'tv', mediaHubId: number) {
  try {
    const query = `/${typeOfShow}/${mediaHubId}?language=pt-BR`
    const response = await api.get(query, {
      params: {
        api_key: apikey
      }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao buscar elenco, por favor tente novamente')
  }
}

export async function getPopularShows(showType: 'movie' | 'tv') {
  try {
    const queryPopularShows = `/${showType}/popular?language=pt-BR&page=1`
    const responsePopularShows = await api.get(queryPopularShows, {
      params: {
        api_key: apikey
      }
    })
    return responsePopularShows?.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao buscar gêneros, por favor tente novamente')
  }
}

export async function getMediaHubByGenreId(showType: 'movie' | 'tv', page: number, genreId: number) {
  try {
    const query = `/discover/${showType}?language=pt-BR&page=${page}&with_genres=${genreId}`
    const responseMediaHub = await api.get(query, {
      params: {
        api_key: apikey
      }
    })
    return responseMediaHub?.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao buscar gêneros, por favor tente novamente')
  }
}


export default api