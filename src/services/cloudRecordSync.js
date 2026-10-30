/*
 * Merge authenticated cloud records into the local read cache.
 * Existing records belonging to other users are left untouched.
 */
export function mergeUserRecords(storageKey, remoteRecords = [], userId) {
  if (!userId || !Array.isArray(remoteRecords)) return;
  let current = [];
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
    current = Array.isArray(parsed) ? parsed : [];
  } catch {
    current = [];
  }

  const otherUsers = current.filter(record => record.userId !== userId);
  const mine = new Map(
    current.filter(record => record.userId === userId && record.id)
      .map(record => [record.id, record])
  );

  for (const record of remoteRecords) {
    if (!record || record.userId !== userId || !record.id) continue;
    mine.set(record.id, { ...mine.get(record.id), ...record, userId });
  }

  localStorage.setItem(storageKey, JSON.stringify([...otherUsers, ...mine.values()]));
}
