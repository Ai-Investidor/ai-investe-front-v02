import { ref, computed } from "vue";
import { useChatService } from "@services/chat.service";

export function useChat() {
  const chatService = useChatService();

  // ── Estado ────────────────────────────────────────────────────────────────

  const conversations = ref([]);
  const activeConversationId = ref(null);
  const isTyping = ref(false);
  const pendingFiles = ref([]);

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

  const historyPayload = computed(() =>
    messages.value.map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    })),
  );

  // ── Conversas ─────────────────────────────────────────────────────────────

  function selectConversation(id) {
    activeConversationId.value = id;
    pendingFiles.value = [];
  }

  function newConversation() {
    const id = String(Date.now());
    conversations.value.unshift({
      id,
      title: "Nova conversa",
      timestamp: new Date(),
      messages: [],
    });
    activeConversationId.value = id;
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

    // Define o título da conversa pela primeira mensagem
    if (conv.messages.length === 0 && trimmed) {
      conv.title =
        trimmed.length > 45 ? trimmed.substring(0, 45) + "..." : trimmed;
    }

    // Snapshot dos arquivos antes de limpar
    const filesToSend = [...pendingFiles.value];

    // Adiciona mensagem do usuário na UI imediatamente
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

    // Limpa arquivos pendentes após capturar
    clearFiles();

    // Indica que a IA está digitando
    isTyping.value = true;

    try {
      const history = historyPayload.value.slice(0, -1); // exclui a mensagem recém adicionada

      const form = new FormData();
      form.append("message", trimmed);
      form.append("history", JSON.stringify(history));
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
    activeConversationId,
    isTyping,
    pendingFiles,

    // Computed
    messages,
    hasActiveConversation,
    activeConversation,

    // Conversas
    selectConversation,
    newConversation,
    deleteConversation,

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
