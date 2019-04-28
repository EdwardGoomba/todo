// library code ex redux
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

// app code
// setup variables for strings
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// action creators
function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  }
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  }
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id
  }
}

// reducer function
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo])
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id)
    case TOGGLE_TODO:
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, { complete: !todo.complete })
      )
    default:
      return state
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal])
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id)
    default:
      return state
  }
}

function app(state = {}, action) {
  return ({
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  })
}

const store = createStore(app)

store.subscribe(() => {
  // pass in function that will be called whenever internal state / store changes
})

// without action creators
store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})

// with action creators - standard practice

store.dispatch(addTodoAction(
  {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
))

// pass in todo id
store.dispatch(remoteTodoAction(1))
