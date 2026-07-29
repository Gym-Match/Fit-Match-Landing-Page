/**
 * Ponto único de integração do pré-cadastro.
 *
 * TODO(supabase): substituir os stubs abaixo pelas chamadas reais.
 * O backend Node separado foi descontinuado — o fluxo passa a ser:
 *   1. `sendVerificationCode` grava o lead e dispara o e-mail com o código
 *      (Edge Function do Supabase);
 *   2. `confirmVerificationCode` valida o código e marca o e-mail como
 *      verificado, devolvendo o código de convite do usuário.
 *
 * Enquanto isso, as duas funções falham de forma explícita para que nada
 * pareça ter dado certo sem ter dado.
 */

export class NotImplementedError extends Error {
  constructor() {
    super(
      "O pré-cadastro está sendo migrado para o Supabase e volta em instantes. Tente novamente mais tarde."
    );
    this.name = "NotImplementedError";
  }
}

export interface PreRegisterInput {
  name: string;
  email: string;
  referralCode?: string;
}

/* eslint-disable @typescript-eslint/no-unused-vars -- assinaturas já definidas para a implementação com Supabase */

export async function sendVerificationCode(
  input: PreRegisterInput
): Promise<void> {
  throw new NotImplementedError();
}

export async function confirmVerificationCode(
  email: string,
  code: string
): Promise<void> {
  throw new NotImplementedError();
}
