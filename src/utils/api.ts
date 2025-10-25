export interface CreateUserRequest {
  name: string;
  email: string;
  indication_code?: string;
}

export interface SendVerificationRequest {
  name: string;
  email: string;
  indication_code?: string;
}

export interface VerifyCodeRequest {
  email: string;
  verification_code: string;
}

export interface CreateUserResponse {
  id?: string;
  name: string;
  email: string;
  createdAt?: string;
  message?: string;
}

export interface SendVerificationResponse {
  message: string;
  email: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function sendVerificationCode(
  userData: SendVerificationRequest
): Promise<SendVerificationResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/users/send-verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        message: data.message || data.error || "Erro desconhecido",
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

export async function verifyCodeAndCreateUser(
  verifyData: VerifyCodeRequest
): Promise<CreateUserResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/users/verify-and-create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verifyData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        message: data.message || data.error || "Erro desconhecido",
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
        message: data.message || data.error || "Erro desconhecido",
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
