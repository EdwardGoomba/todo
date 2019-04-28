{
  type: 'ADD_TODO',
    todo: {
    id: 0,
      name: 'Learn Redux',
        complete: false
  }
}

{
  type: 'REMOVE_TODO',
    id: 0
}

{
  type: 'TOGGLE_TODO',
    id: 0
}

{
  type: 'ADD_GOAL',
    goal: {
    id: 0,
      name: 'Run a marathon'
  }
}

{
  type: 'REMOVE_GOAL',
    id: 0,
}

// Reducer function
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo])
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.id)
    case 'TOGGLE_TODO':
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, { complete: !todo.complete })
      )
    default:
      return state
  }
}

function createStore(reducer) {
  // The store should have four parts:
  // 1. The state
  // 2. Get the state
  // 3. Listen to updates on state
  // 4. Update the state

  // initialize local state
  // 1
  let state
  let listeners = []

  // function to get the state
  // 2
  const getState = () => state

  // listen to updates on state
  // 3
  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  // responsible for updating the state
  // 4
  const dispatch = (action) => {
    state = reducer(state, action)
    // loop over listners and invoke them
    listeners.forEach((listener) => listener())
  }

  // return state by calling getState when createStore is called
  return {
    getState,
    subscribe,
    dispatch
  }
}

const store = createStore()

store.subscribe(() => {
  // pass in function that will be called whenever internal state / store changes
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})
