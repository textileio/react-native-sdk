export * from '@textile/js-types'

export class EventSubscription {
  cancel: () => void
  constructor(cancel: () => void) {
    this.cancel = cancel
  }
}
