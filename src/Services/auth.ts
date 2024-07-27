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