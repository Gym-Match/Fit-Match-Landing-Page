import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  createUser,
  type CreateUserRequest,
  type ApiError,
} from "../utils/api";

interface UserData {
  fullName: string;
  email: string;
  registeredAt: string;
}

interface UsePreRegisterReturn {
  isLoading: boolean;
  showSuccess: boolean;
  registeredUsers: UserData[];
  remainingSlots: number;
  submitForm: (fullName: string, email: string) => Promise<void>;
  closeSuccess: () => void;
}

const MAX_PREMIUM_USERS = 1000;

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const hasFullName = (name: string) => {
  return (
    name
      .trim()
      .split(" ")
      .filter((word) => word.length > 0).length >= 2
  );
};

export function usePreRegister(): UsePreRegisterReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<UserData[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("fitMatchUsers");
      if (stored) {
        setRegisteredUsers(JSON.parse(stored));
      }
    }
  }, []);

  const isEmailAlreadyRegistered = (email: string) => {
    return registeredUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  };

  const submitForm = async (fullName: string, email: string) => {
    if (!fullName || fullName.length < 2) {
      throw new Error("Por favor, digite um nome válido.");
    }

    if (!hasFullName(fullName)) {
      throw new Error("Por favor, digite seu nome completo.");
    }

    if (!email || !isValidEmail(email)) {
      throw new Error("Por favor, digite um e-mail válido.");
    }

    if (registeredUsers.length >= MAX_PREMIUM_USERS) {
      throw new Error(
        "Infelizmente todas as vagas premium já foram preenchidas! 😢"
      );
    }

    if (isEmailAlreadyRegistered(email)) {
      throw new Error("Este e-mail já garantiu o Premium gratuito! 🎉");
    }

    setIsLoading(true);

    try {
      const apiData: CreateUserRequest = {
        name: fullName,
        email: email,
      };

      const response = await createUser(apiData);

      const userData: UserData = {
        fullName,
        email,
        registeredAt: new Date().toISOString(),
      };

      const updatedUsers = [...registeredUsers, userData];
      setRegisteredUsers(updatedUsers);

      if (typeof window !== "undefined") {
        localStorage.setItem("fitMatchUsers", JSON.stringify(updatedUsers));
      }

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 10000);
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);

      const apiError = error as ApiError;

      if (apiError.status === 400) {
        if (apiError.message.toLowerCase().includes("email") || apiError.message === "Email já está em uso") {
          toast.info("Este e-mail já fez o pré-cadastro e já garantiu o um mês premium grátis! 🎉", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          return; // Não lançar erro, apenas mostrar o toast
        } else {
          throw new Error(
            apiError.message || "Dados inválidos. Verifique as informações."
          );
        }
      } else if (apiError.status === 0) {
        throw new Error(apiError.message);
      } else if (apiError.status >= 500) {
        throw new Error(
          "Erro no servidor. Tente novamente em alguns instantes."
        );
      } else {
        throw new Error(
          apiError.message || "Ocorreu um erro. Tente novamente."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closeSuccess = () => {
    setShowSuccess(false);
  };

  const remainingSlots = MAX_PREMIUM_USERS - registeredUsers.length;

  return {
    isLoading,
    showSuccess,
    registeredUsers,
    remainingSlots,
    submitForm,
    closeSuccess,
  };
}
