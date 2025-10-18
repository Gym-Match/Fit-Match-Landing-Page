// Tipos para a API
export interface CreateUserRequest {
  name: string;
  email: string;
  referralCode?: string;
}

export interface CreateUserResponse {
  id?: string;
  name: string;
  email: string;
  createdAt?: string;
  referralCode?: string;
  referredBy?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function createUser(
  userData: CreateUserRequest
): Promise<CreateUserResponse> {
  console.log("Enviando dados:", userData);
  console.log("API URL:", API_BASE_URL);

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
    if (error instanceof TypeError) {
      throw {
        message: "Erro de conexão. Verifique sua internet e tente novamente.",
        status: 0,
      } as ApiError;
    }

    throw error;
  }
}

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
      return false;
    }

    if (response.ok) {
      return true;
    }

    return false;
  } catch (error) {
    console.warn("Erro ao verificar email:", error);
    return false;
  }
}
