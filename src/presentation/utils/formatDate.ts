// funcion para transformar fechas a yyyy/mm/dd

export function formatDate(dateString: string): string | null {
  if (!dateString) return null;
  const parts = dateString.split("T")[0].split("-");
  return parts.length === 3 ? parts.join("-") : null;
}
