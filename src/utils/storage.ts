function getLocalStorageItem(key: string): string | undefined {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) ?? undefined
  }

  return
}

export { getLocalStorageItem }
