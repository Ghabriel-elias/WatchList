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