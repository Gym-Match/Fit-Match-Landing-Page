import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  sendVerificationCode,
  verifyCodeAndCreateUser,
  type SendVerificationRequest,
  type ApiError,
} from "../utils/api";

interface UseEmailVerificationReturn {
  isLoading: boolean;
  showSuccess: boolean;
  showVerificationForm: boolean;
  pendingEmail: string;
  canResend: boolean;
  resendCountdown: number;
  sendCode: (
    fullName: string,
    email: string,
    invitationCode?: string
  ) => Promise<void>;
  verifyCode: (code: string) => Promise<void>;
  resendCode: () => Promise<void>;
  goBack: () => void;
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

export function useEmailVerification(): UseEmailVerificationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [pendingData, setPendingData] =
    useState<SendVerificationRequest | null>(null);
  const [canResend, setCanResend] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Timer para reenvio de código
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    } else if (resendCountdown === 0 && !canResend) {
      setCanResend(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendCountdown, canResend]);

  const startResendTimer = () => {
    setCanResend(false);
    setResendCountdown(30); // 30 segundos
  };

  const sendCode = async (
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
      const apiData: SendVerificationRequest = {
        name: fullName,
        email: email,
        indication_code: invitationCode || undefined,
      };

      await sendVerificationCode(apiData);

      // Guardar dados para reenvio e verificação
      setPendingData(apiData);
      setPendingEmail(email);
      setShowVerificationForm(true);
      startResendTimer(); // Iniciar timer de 30 segundos

      toast.success("Código de verificação enviado para seu e-mail!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Erro ao enviar código:", error);
      const apiError = error as ApiError;

      if (
        apiError.status === 409 &&
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
        return;
      }

      // Para outros erros, lançar exceção para ser tratada pelo componente
      if (apiError.status === 400) {
        throw new Error(
          apiError.message || "Dados inválidos. Verifique as informações."
        );
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

  const verifyCode = async (code: string) => {
    if (!code || code.length !== 6) {
      throw new Error("Por favor, digite um código de 6 dígitos.");
    }

    if (!pendingEmail) {
      throw new Error("Erro interno. Tente novamente.");
    }

    setIsLoading(true);

    try {
      await verifyCodeAndCreateUser({
        email: pendingEmail,
        verification_code: code,
      });

      setShowVerificationForm(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 10000);
    } catch (error) {
      console.error("Erro ao verificar código:", error);
      const apiError = error as ApiError;

      if (apiError.status === 400) {
        throw new Error(apiError.message || "Código inválido ou expirado.");
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

  const resendCode = async () => {
    if (!pendingData) {
      throw new Error("Erro interno. Tente novamente.");
    }

    setIsLoading(true);

    try {
      await sendVerificationCode(pendingData);
      startResendTimer(); // Reiniciar timer após reenvio

      toast.success("Novo código enviado para seu e-mail!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Erro ao reenviar código:", error);
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || "Erro ao reenviar código. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    setShowVerificationForm(false);
    setPendingEmail("");
    setPendingData(null);
    setCanResend(true);
    setResendCountdown(0);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
  };

  return {
    isLoading,
    showSuccess,
    showVerificationForm,
    pendingEmail,
    canResend,
    resendCountdown,
    sendCode,
    verifyCode,
    resendCode,
    goBack,
    closeSuccess,
  };
}
