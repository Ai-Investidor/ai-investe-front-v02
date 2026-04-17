/**
 * rules.js — Regras de validação reutilizáveis para campos de formulário.
 *
 * Cada exportação é um array de funções compatível com a prop `rules` do QInput (Quasar).
 * Para regras que dependem de outro campo (ex: confirmação de senha),
 * use as factories — funções que recebem um parâmetro e retornam um array de rules.
 *
 * Uso:
 *   import { emailRules, passwordRules, confirmPasswordRules } from 'constants/rules'
 *   // no template: :rules="emailRules"
 *   // factory:     :rules="confirmPasswordRules(password)"
 */

// ── Primitivos reutilizáveis ──────────────────────────────────────────────────

const required = (msg) => (v) => !!v || msg;

const minLength = (n, msg) => (v) => (v && v.length >= n) || msg;

const matchField = (other, msg) => (v) => v === other || msg;

const pattern = (regex, msg) => (v) => regex.test(v) || msg;

// ── Regex ─────────────────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Rules exportadas ──────────────────────────────────────────────────────────

export const emailRules = [
  required("E-mail é obrigatório"),
  pattern(EMAIL_REGEX, "E-mail inválido"),
];

export const passwordRules = [
  required("Senha é obrigatória"),
  minLength(6, "A senha deve ter no mínimo 6 caracteres"),
];

export const nameRules = [
  required("Nome é obrigatório"),
  minLength(3, "Nome deve ter no mínimo 3 caracteres"),
  (v) => (v && v.trim().includes(" ")) || "Informe o nome completo",
];

export const phoneRules = [
  required("Telefone é obrigatório"),
  (v) => (v && v.length === 11) || "Telefone deve ter 11 dígitos (DDD + 9 dígitos)",
  (v) => (v && v.charAt(2) === "9") || "Celular deve começar com 9 após o DDD",
];

// ── Factories (dependem de outro valor) ───────────────────────────────────────

/**
 * Retorna rules para o campo de confirmação de senha.
 * @param {string} password — valor atual do campo senha
 * @returns {Array}
 */
export const confirmPasswordRules = (password) => [
  required("Confirmação de senha é obrigatória"),
  matchField(password, "As senhas não conferem"),
];
