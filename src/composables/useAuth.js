import { useAuthStore } from "@stores/auth.store";
import { useAuthService } from "@services/auth.service";
import { NotifySuccess, NotifyError } from "boot/notify";
import { useRouter } from "vue-router";
import { Logger } from "src/boot/logger";

export default function useAuth() {
  const store = useAuthStore();
  const authService = useAuthService();
  const router = useRouter();

  // ── Inicialização — escuta mudanças de sessão do Supabase ─────────────────

  function initAuthListener() {
    const { data } = authService.onAuthStateChange((event, session) => {
      store.setSession(session);

      if (event === "SIGNED_IN") {
        router.push("/");
      }

      if (event === "SIGNED_OUT") {
        store.clear();
        router.push("/login");
      }
    });

    return () => data.subscription.unsubscribe();
  }

  // ── Sessão atual ──────────────────────────────────────────────────────────

  async function loadSession() {
    const { data, error } = await authService.getSession();

    if (error || !data?.session) {
      store.clear();
      return;
    }

    store.setSession(data.session);
  }

  // ── Login com e-mail e senha ──────────────────────────────────────────────

  async function login(email, password) {
    store.setLoading(true);
    try {
      const { data, error } = await authService.login(email, password);

      if (error) {
        NotifyError(_getLoginErrorMessage(error));
        return false;
      }

      if (data?.user) {
        store.setSession(data.session);
        NotifySuccess("Login realizado com sucesso!");
        router.push("/");

        return true;
      }

      return false;
    } catch {
      NotifyError("Ocorreu um erro ao entrar. Tente novamente.");
      return false;
    } finally {
      store.setLoading(false);
    }
  }

  // ── Login com Google ──────────────────────────────────────────────────────

  async function loginWithGoogle() {
    store.setLoading(true);
    try {
      const { error } = await authService.loginWithGoogle();

      if (error) {
        NotifyError("Não foi possível iniciar o login com Google.");
        return false;
      }

      // O Supabase redireciona automaticamente — onAuthStateChange cuida do resto
      return true;
    } catch {
      NotifyError("Não foi possível iniciar o login com Google.");
      return false;
    } finally {
      store.setLoading(false);
    }
  }

  // ── Cadastro ──────────────────────────────────────────────────────────────

  async function register(email, password) {
    store.setLoading(true);
    try {
      const { data, error } = await authService.register(email, password);

      if (error) {
        NotifyError(_getRegisterErrorMessage(error));
        return false;
      }

      if (data?.user) {
        NotifySuccess(
          "Conta criada! Verifique seu e-mail para confirmar o cadastro.",
        );
        router.push("/login");
        return true;
      }

      return false;
    } catch {
      NotifyError("Ocorreu um erro ao criar sua conta. Tente novamente.");
      return false;
    } finally {
      store.setLoading(false);
    }
  }

  // ── Logout ────────────────────────────────────────────────────────────────

  async function logout() {
    store.setLoading(true);
    try {
      const { error } = await authService.logout();

      if (error) {
        Logger.error(error);
        NotifyError("Erro ao encerrar a sessão. Tente novamente.");
        return false;
      }

      store.clear();
      NotifySuccess("Sessão encerrada com sucesso.");
      router.push("/login");
      return true;
    } catch {
      NotifyError("Erro ao encerrar a sessão. Tente novamente.");

      return false;
    } finally {
      store.setLoading(false);
    }
  }

  // ── Recuperação de senha ──────────────────────────────────────────────────

  async function resetPassword(email) {
    store.setLoading(true);
    try {
      const { error } = await authService.resetPassword(email);

      if (error) {
        NotifyError("Não foi possível enviar o e-mail de recuperação.");
        return false;
      }

      NotifySuccess("E-mail de recuperação enviado! Verifique sua caixa.");
      return true;
    } catch {
      NotifyError("Ocorreu um erro. Tente novamente.");
      return false;
    } finally {
      store.setLoading(false);
    }
  }

  // ── Atualização de senha ──────────────────────────────────────────────────

  async function updatePassword(newPassword) {
    store.setLoading(true);
    try {
      const { error } = await authService.updatePassword(newPassword);

      if (error) {
        NotifyError("Não foi possível atualizar a senha.");
        return false;
      }

      NotifySuccess("Senha atualizada com sucesso!");
      return true;
    } catch {
      NotifyError("Ocorreu um erro. Tente novamente.");
      return false;
    } finally {
      store.setLoading(false);
    }
  }

  // ── Mapeamento de erros ───────────────────────────────────────────────────

  function _getLoginErrorMessage(error) {
    const msg = error?.message?.toLowerCase() ?? "";
    if (
      msg.includes("invalid login credentials") ||
      msg.includes("invalid credentials")
    ) {
      return "E-mail ou senha incorretos.";
    }
    if (msg.includes("email not confirmed")) {
      return "Confirme seu e-mail antes de entrar.";
    }
    if (msg.includes("too many requests") || msg.includes("rate limit")) {
      return "Muitas tentativas. Aguarde alguns instantes.";
    }
    if (msg.includes("network") || msg.includes("fetch")) {
      return "Erro de conexão. Verifique sua internet.";
    }
    return "Ocorreu um erro ao entrar. Tente novamente.";
  }

  function _getRegisterErrorMessage(error) {
    const msg = error?.message?.toLowerCase() ?? "";
    if (
      msg.includes("user already registered") ||
      msg.includes("already been registered")
    ) {
      return "Este e-mail já está cadastrado.";
    }
    if (msg.includes("password") && msg.includes("weak")) {
      return "Senha muito fraca. Use letras, números e símbolos.";
    }
    if (msg.includes("network") || msg.includes("fetch")) {
      return "Erro de conexão. Verifique sua internet.";
    }
    return "Ocorreu um erro ao criar sua conta. Tente novamente.";
  }

  // ── Exposição pública ─────────────────────────────────────────────────────

  return {
    // Estado (lido direto da store para reatividade)
    user: store,
    isAuthenticated: () => store.isAuthenticated,
    isLoading: () => store.loading,
    userFullName: () => store.userFullName,
    userEmail: () => store.userEmail,
    userAvatar: () => store.userAvatar,

    // Ações
    initAuthListener,
    loadSession,
    login,
    loginWithGoogle,
    register,
    logout,
    resetPassword,
    updatePassword,
  };
}
