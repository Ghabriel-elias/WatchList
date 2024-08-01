import api from "./api"

interface AuthResponse {
  token: string;
  user: {
    email: string;
    id: string;
    name: string;
  };
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/login', {
      email: email,
      password: password
    })
    return response.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao fazer login, por favor tente novamente')
  }
}

interface RegisterResponseProps {
  user: {
    password: null;
    id: string;
    name: string;
    email: string;
    role: string;
    favorites: [];
  };
}

export const register = async (name: string, email: string, password: string): Promise<RegisterResponseProps> => {
  try {
    const response = await api.post('/auth/register', {
      name: name,
      email: email,
      password: password
    })
    return response.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao tentar se registrar, por favor tente novamente')
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

export async function editUserRequest(token: string, userData: {name: string, email: string}) {
  try {
    const {data} = await api.patch('/auth/edit', {
      name: userData.name,
      email: userData.email
    }, {
      headers: {
        Authorization: token
      }
    })
    return data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao atualizar dados do usuário, por favor tente novamente')
  }
}

export const checkPassword = async (token: string, password: string): Promise<Number> => {
  try {
    const response = await api.post('/auth/check', {
        password: password
      }, 
      {
        headers: {
          Authorization: token
        }
      }
    )
    return response.status
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao verificar senha, por favor tente novamente')
  }
}