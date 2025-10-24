import { useState } from "react";
import { toast } from "react-toastify";
import {
  createUser,
  type CreateUserRequest,
  type ApiError,
} from "../utils/api";

interface UsePreRegisterReturn {
  isLoading: boolean;
  showSuccess: boolean;
  submitForm: (
    fullName: string,
    email: string,
    invitationCode?: string
  ) => Promise<void>;
  closeSuccess: () => void;
}

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

  const submitForm = async (
    fullName: string,
    email: string,
    invitationCode?: string
  ) => {
    if (!fullName || fullName.length < 2) {
      throw new Error("Por favor, digite um nome válido.");
    }

    if (!hasFullName(fullName)) {
      throw new Error("Por favor, digite seu nome completo.");
    }

    if (!email || !isValidEmail(email)) {
      throw new Error("Por favor, digite um e-mail válido.");
    }

    setIsLoading(true);

    try {
      const apiData: CreateUserRequest = {
        name: fullName,
        email: email,
        indication_code: invitationCode || undefined,
      };

      await createUser(apiData);

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 10000);
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);

      const apiError = error as ApiError;
      console.log("API Error:", apiError);

      // Verificar se é erro de email duplicado ANTES de qualquer outra verificação
      if (
        apiError.status === 400 &&
        apiError.message &&
        (apiError.message === "Email já está em uso" ||
          apiError.message.toLowerCase().includes("email"))
      ) {
        toast.info(
          "Este e-mail já fez o pré-cadastro e já garantiu o primeiro mês de premium! 🎉",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        setIsLoading(false);
        return; // Não lançar erro, apenas mostrar o toast
      }

      // Para todos os outros erros, lançar exceção
      if (apiError.status === 400) {
        if (
          apiError.message.toLowerCase().includes("email") ||
          apiError.message === "Email já está em uso"
        ) {
          toast.info(
            "Este e-mail já fez o pré-cadastro e já garantiu o um mês premium grátis! 🎉",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
          return; // Não lançar erro, apenas mostrar o toast
        } else {
          // Para códigos de convite inválidos e outros erros 400, lançar o erro
          // para ser tratado pelo componente
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

  return {
    isLoading,
    showSuccess,
    submitForm,
    closeSuccess,
  };
}
