export function getRemoteServerMessage(payload = {}) {
  const from = payload.from || 'astro_remote/server';
  const loadedAt = payload.loadedAt || new Date().toISOString();
  return `Remote SSR module loaded from ${from} at ${loadedAt}`;
}
