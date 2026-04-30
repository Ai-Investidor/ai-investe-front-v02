/**
 *
 *
 * @description Tenta parsear uma string JSON e retorna o resultado. Se a string não for um JSON válido, retorna null.
 * @param {string} str - A string a ser parseada.
 * @returns {object|null} O objeto resultante do parse ou null se a string for inválida.
 */

export function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}
