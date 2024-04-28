export function normalizeQuery(query: string) {
  return query
    .replace(/\s*(AND|OR)\s*/gi, ' $1 ') // Ensure space around AND and OR
    .replace(/(\(|\))/g, ' $1 ') // Ensure space around parentheses
    .trim()
    .replace(/\s+/g, ' '); // Convert multiple spaces to a single space
}
