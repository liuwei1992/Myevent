class MyEvent{
  constructor(){
    this.handers = {}
  }

  on(name,fun,thisArg){
    const funs = this.handers[name] = this.handers[name] ?? new Set()
    fun.thisArg = thisArg
    funs.add(fun)
  }

  once(name,fun,thisArg){
    const funs = this.handers[name] = this.handers[name] ?? new Set()
    fun.thisArg = thisArg
    fun.once = true
    funs.add(fun)
  }

  emit(name,...arg){
    const funs = this.handers[name]
    funs.forEach(fun=>{
      fun.apply(fun.thisArg,...arg)
      if(fun.once){
        funs.delete(fun)
      }
    })
  }

  off(name,fun){
    const funs = this.handers[name]
    funs.delete(fun)
  }
}

const e = new MyEvent()
e.on('test',()=>{console.log('hahahah')})
e.emit('test')