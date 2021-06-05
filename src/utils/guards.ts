function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== undefined
}

function assertDefined<T>(value: T, message = "Expected some value"): asserts value is NonNullable<T> {
  if (!isDefined(value)) {
    throw new TypeError(message)
  }
}

export { assertDefined }
