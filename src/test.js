
const handler = {
  get (target, propKey) {
    if (propKey === 'prototype') {
      return Object.prototype
    }
    return 'hello' + propKey
  },

  apply (target, object, args) {
    console.log('target', object)
    return args[0]
  },

  construct (target, args) {
    return { value: args[1] }
  }
}

const Fproxy = new Proxy(function (x, y) { return x + y }, handler)

const A = () => {}
Fproxy(1, 2)
// Fproxy.apply(A, 2, 3)
console.log('fsdf', new Fproxy(1, 3))
