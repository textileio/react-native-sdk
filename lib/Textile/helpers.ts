export function createTimeout(ms: number, promise: Promise<any>): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'))
    }, ms)
    promise.then(resolve, reject)
  })
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
