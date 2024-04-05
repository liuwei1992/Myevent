class EventBus {
  constructor() {
    this.events = {}
  }

  on(name, fun, thisArg) {
    const handles = (this.events[name] = this.events[name] ?? new Set())
    handles.add({
      thisArg,
      fun,
    })
  }

  once(name, fun, thisArg) {
    const cb = (...args) => {
      this.off(name, cb)
      fun.apply(thisArg, args)
    }
    this.on(name, cb)
  }

  emit(name, ...args) {
    const handles = this.events[name]
    if (!handles) return

    handles.forEach(({ fun, thisArg }) => {
      fun.apply(thisArg, args)
    })
  }

  off(name, fun) {
    const handles = this.events[name]
    if (!handles) return

    for (const handle of handles) {
      if (handle.fun === fun) {
        handles.delete(handle)
        break
      }
    }

    if (handles.size === 0) {
      delete this.events[name]
    }
  }
}

export default EventBus
