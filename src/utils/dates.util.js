/**
 * Converte uma string ISO 8601 para exibição amigável em pt-BR.
 *
 * Exemplos de saída:
 *   - Hoje:         "Hoje às 03:02"
 *   - Ontem:        "Ontem às 23:45"
 *   - Essa semana:  "Terça-feira às 14:30"
 *   - Mais antigo:  "01/04/2026 às 03:02"
 *
 * @param {string|Date} value - Data ISO ou objeto Date
 * @returns {string}
 */
export function formatDateBR(value) {
  if (!value) return "";

  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date)) return "";

  const now = new Date();

  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (sameDay(date, now)) {
    return `Hoje às ${time}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (sameDay(date, yesterday)) {
    return `Ontem às ${time}`;
  }

  const diffDays = Math.floor((now - date) / 86_400_000);
  if (diffDays < 7) {
    const weekday = date.toLocaleDateString("pt-BR", { weekday: "long" });
    const capitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1);
    return `${capitalized} às ${time}`;
  }

  const dayMonth = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return `${dayMonth} às ${time}`;
}
