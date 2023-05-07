
const addItem = (storage: Storage, key: string, value: string) => {
  storage.setItem(key, value)
}

const get = (storage: Storage, key: string) => {
  const v = storage.getItem(key)
  return JSON.parse(v)
}

const remove = (storage:Storage, key:string) => {
  storage.remove(key)
}


const local = {
  add: addItem.bind(null, localStorage),
  get: get.bind(null, localStorage),
  remove: remove.bind(null, localStorage)
}

const session = {
  add: addItem.bind(null, localStorage),
  get: get.bind(null, localStorage),
  remove: remove.bind(null, localStorage)
}

const storage = {
  local,
  session,
}

export default storage