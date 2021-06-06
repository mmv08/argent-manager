function isValidEnsName(name: string): boolean {
  return /^([\w-]+\.)+(eth|xyz)$/.test(name)
}

export { isValidEnsName }
