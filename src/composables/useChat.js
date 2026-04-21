import { ref, computed } from "vue";
import { useChatService } from "@services/chat.service";

export function useChat() {
  const chatService = useChatService();

  // ── Estado ────────────────────────────────────────────────────────────────

  const conversations = ref([]);
  const sessions = ref([]);
  const activeConversationId = ref(null);
  const isTyping = ref(false);
  const isLoadingSessions = ref(false);
  const isLoadingMessages = ref(false);
  const messagePagination = ref(null);
  const pendingFiles = ref([]);
  const selectedSession = ref(null);

  // ── Computed ──────────────────────────────────────────────────────────────

  const activeConversation = computed(
    () =>
      conversations.value.find((c) => c.id === activeConversationId.value) ??
      null,
  );

  const messages = computed(() => activeConversation.value?.messages ?? []);

  const hasActiveConversation = computed(
    () => activeConversationId.value !== null,
  );

  const hasMoreMessages = computed(
    () => messagePagination.value?.has_next ?? false,
  );

  // ── Conversas ─────────────────────────────────────────────────────────────

  function selectConversation(id) {
    activeConversationId.value = id;
    pendingFiles.value = [];
  }

  function newConversation(title) {
    const id = String(Date.now());
    conversations.value.unshift({
      id,
      title: title ?? "Nova conversa",
      timestamp: new Date(),
      messages: [],
    });
    activeConversationId.value = id;
    selectedSession.value = null;
    pendingFiles.value = [];
  }

  function deleteConversation(id) {
    conversations.value = conversations.value.filter((c) => c.id !== id);
    if (activeConversationId.value === id) {
      activeConversationId.value = conversations.value[0]?.id ?? null;
    }
  }

  // ── Arquivos pendentes ────────────────────────────────────────────────────

  function attachFiles(files) {
    const incoming = Array.isArray(files) ? files : Array.from(files);
    pendingFiles.value = [...pendingFiles.value, ...incoming];
  }

  function removeFile(index) {
    pendingFiles.value.splice(index, 1);
  }

  function clearFiles() {
    pendingFiles.value = [];
  }

  // ── Sessions ───────────────────────────────────────────────────────────────

  async function loadSessions(idSession) {
    if (!idSession) return;

    isLoadingSessions.value = true;

    try {
      const { data, error } = await chatService.getSessions(idSession);

      if (error) throw error;

      sessions.value = data ?? [];
    } catch (err) {
      console.error("Erro ao carregar sessions:", err);
      sessions.value = [];
    } finally {
      isLoadingSessions.value = false;
    }
  }

  function _mapMessages(rawMessages) {
    return (rawMessages ?? []).map((msg) => ({
      id: String(msg.id),
      sender: msg.role === "user" ? "user" : "ai",
      text: msg.content ?? msg.message ?? msg.text ?? "",
      files: [],
      timestamp: new Date(msg.created_at),
    }));
  }

  async function getMessagesSessions(sessionId) {
    if (!sessionId) return;

    isLoadingMessages.value = true;
    messagePagination.value = null;

    try {
      const { data: rpcResult, error } = await chatService.getMessagesPaginated(
        sessionId,
        1,
        10,
        "DESC",
      );

      if (error) throw error;

      messagePagination.value = rpcResult?.pagination ?? null;

      const loadedMessages = _mapMessages(rpcResult?.data).reverse();

      const session = sessions.value.find((s) => s.id === sessionId);

      const conversation = {
        id: sessionId,
        title: session?.title ?? "Conversa anterior",
        timestamp: session?.created_at
          ? new Date(session.created_at)
          : new Date(),
        messages: loadedMessages,
      };

      const existingIndex = conversations.value.findIndex(
        (c) => c.id === sessionId,
      );

      if (existingIndex >= 0) {
        conversations.value[existingIndex] = conversation;
      } else {
        conversations.value.unshift(conversation);
      }

      activeConversationId.value = sessionId;
      selectedSession.value = sessionId;

      pendingFiles.value = [];
    } catch (err) {
      console.error("Erro ao carregar mensagens da sessão:", err);
    } finally {
      isLoadingMessages.value = false;
    }
  }

  async function loadMoreMessages() {
    const sessionId = activeConversationId.value;
    if (!sessionId || !messagePagination.value?.has_next) return;

    isLoadingMessages.value = true;

    const nextPage = messagePagination.value.page + 1;

    try {
      const { data: rpcResult, error } = await chatService.getMessagesPaginated(
        sessionId,
        nextPage,
        10,
        "DESC",
      );

      if (error) throw error;

      messagePagination.value = rpcResult?.pagination ?? null;

      const newMessages = _mapMessages(rpcResult?.data).reverse();

      const conv = conversations.value.find((c) => c.id === sessionId);
      if (conv) {
        conv.messages = [...newMessages, ...conv.messages];
      }
    } catch (err) {
      console.error("Erro ao carregar mais mensagens:", err);
    } finally {
      isLoadingMessages.value = false;
    }
  }

  // ── Envio de mensagem ─────────────────────────────────────────────────────

  async function sendMessage(text) {
    const trimmed = (text ?? "").trim();
    if (!trimmed && pendingFiles.value.length === 0) return;

    if (!activeConversationId.value) {
      newConversation();
    }

    const conv = conversations.value.find(
      (c) => c.id === activeConversationId.value,
    );
    if (!conv) return;

    if (conv.messages.length === 0 && trimmed) {
      conv.title =
        trimmed.length > 45 ? trimmed.substring(0, 45) + "..." : trimmed;
    }

    const filesToSend = [...pendingFiles.value];

    const userMessage = {
      id: String(Date.now()),
      sender: "user",
      text: trimmed,
      files: filesToSend.map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
      })),
      timestamp: new Date(),
    };
    conv.messages.push(userMessage);
    conv.timestamp = new Date();

    clearFiles();

    isTyping.value = true;

    try {
      const sessionId = activeConversationId.value;

      const form = new FormData();
      form.append("message", trimmed);
      if (sessionId) form.append("session_id", sessionId);

      filesToSend.forEach((file) => form.append("files", file, file.name));

      const responseData = await chatService.sendMessage(form);

      const aiText =
        responseData?.message ??
        responseData?.text ??
        responseData?.content ??
        responseData?.response ??
        "Não foi possível obter uma resposta.";

      conv.messages.push({
        id: String(Date.now() + 1),
        sender: "ai",
        text: aiText,
        timestamp: new Date(),
      });
    } catch {
      conv.messages.push({
        id: String(Date.now() + 1),
        sender: "ai",
        text: "Ocorreu um erro ao processar sua mensagem. Tente novamente.",
        timestamp: new Date(),
        isError: true,
      });
    } finally {
      isTyping.value = false;
    }
  }

  // ── Utilitários ───────────────────────────────────────────────────────────

  function formatForDisplay(timestamp) {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / 86400000);

    if (diffDays === 0) {
      return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7)
      return date.toLocaleDateString("pt-BR", { weekday: "long" });
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  }

  // ── Exposição pública ─────────────────────────────────────────────────────

  return {
    // Estado
    conversations,
    sessions,
    activeConversationId,
    isTyping,
    isLoadingSessions,
    isLoadingMessages,
    messagePagination,
    pendingFiles,
    selectedSession,

    // Computed
    messages,
    hasActiveConversation,
    activeConversation,
    hasMoreMessages,

    // Conversas
    selectConversation,
    newConversation,
    deleteConversation,

    // Sessions
    loadSessions,
    getMessagesSessions,
    loadMoreMessages,

    // Arquivos
    attachFiles,
    removeFile,
    clearFiles,

    // Envio
    sendMessage,

    // Utils
    formatForDisplay,
  };
}
