import EventBus from './lib/index.js'

const e = new EventBus()
e.once(
  'test',
  function (...args) {
    console.log('hahahah', args)
    console.log('age', this.age)
  },
  {
    age: 18,
  },
)
e.emit('test', { name: 'aaa', number: 11 })
e.emit('test', { name: 'bbb', number: 22 })
