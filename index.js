class MyEvent{
  constructor(){
    this.events = {}
  }

  on(name,fun,thisArg){
    const handles = this.events[name] = this.events[name] ?? new Set()
    handles.add({
      thisArg,
      fun
    })
  }

  once(name,fun,thisArg){
    const handles = this.events[name] = this.events[name] ?? new Set()
    handles.add({
      thisArg,
      once: true,
      fun
    })
  }

  emit(name,...arg){
    const handles = this.events[name]
    handles.forEach((handle)=>{
      const {fun,thisArg,once} = handle
      fun.apply(thisArg,...arg)
      if(once){
        handles.delete(handle)
      }
    })
  }

  off(name,fun){
    const handles = this.events[name]
    handles.forEach(handle=>{
      if(handle.fun === fun){
        handles.delete(handle)
      }
    })
  }
}

const e = new MyEvent()
e.once('test',()=>{console.log('hahahah')})
e.emit('test')
e.emit('test')