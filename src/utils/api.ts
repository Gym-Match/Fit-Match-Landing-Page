// Tipos para a API
export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface CreateUserResponse {
  id?: string;
  name: string;
  email: string;
  createdAt?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Configuração base da API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Função para criar usuário
export async function createUser(
  userData: CreateUserRequest
): Promise<CreateUserResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        message: data.message || "Erro desconhecido",
        status: response.status,
        errors: data.errors,
      };
      throw error;
    }

    return data;
  } catch (error) {
    // Se for um erro de rede ou parsing
    if (error instanceof TypeError) {
      throw {
        message: "Erro de conexão. Verifique sua internet e tente novamente.",
        status: 0,
      } as ApiError;
    }

    // Re-throw API errors
    throw error;
  }
}

// Função para verificar se o email já existe (opcional)
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/check-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.status === 404) {
      return false; // Email não existe
    }

    if (response.ok) {
      return true; // Email existe
    }

    // Para outros status codes, assumir que não existe
    return false;
  } catch (error) {
    console.warn("Erro ao verificar email:", error);
    return false; // Em caso de erro, permitir o cadastro
  }
}
