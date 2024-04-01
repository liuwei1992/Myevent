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
    const cb = (...args)=>{
      this.off(name,cb)
      fun.apply(thisArg,...args)
    }
    this.on(name,cb)
  }

  emit(name,...args){
    const handles = this.events[name]
    if(!handles) return 
    
    handles.forEach(({fun,thisArg})=>{
      fun.apply(thisArg,...args)
    })
  }

  off(name,fun){
    const handles = this.events[name]
    if(!handles) return

    handles.forEach(handle=>{
      if(handle.fun === fun){
        handles.delete(handle)
      }
    })

   if(handles.size===0){
    delete this.events[name]
   }
  }
}

const e = new MyEvent()
e.once('test',function(){
  console.log('hahahah')
  console.log('age',this.age)
},{
  age: 18
})
e.emit('test')
e.emit('test')