export function filterNullValues(obj: any): any {
  if (typeof obj !== "object" || obj === null) return obj;

  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => value !== null)
      .map(([key, value]) => [key, filterNullValues(value)])
  );
}
