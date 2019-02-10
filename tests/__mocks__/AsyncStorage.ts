export default class AsyncStorage {
  setItem = jest.fn((key: string, value: any) => {
      return new Promise((resolve) => {
        this.mockSet(key, value)
        resolve()
      })
  })
  getItem = jest.fn((key: string) => {
      return new Promise((resolve) => {
          resolve(this.mockGet(key))
      })
  })

  multiRemove = jest.fn(() => {
    return new Promise((resolve) => {
      this.data = {}
      resolve()
    })
  })

  data: {[key: string]: string} = {}
  mockSet = (key: string, value: any) => {
    this.data[key] = value
  }
  mockGet = (key: string): any => {
    return this.data[key]
  }
}
