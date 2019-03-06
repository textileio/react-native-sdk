export default {
    stop: jest.fn((): Promise<void> => new Promise((resolve) => {
        resolve()
    })),
    start: jest.fn((): Promise<void> => new Promise((resolve) => {
        resolve()
    }))
}
