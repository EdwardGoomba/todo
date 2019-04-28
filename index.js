function createStore() {
  // The store should have four parts:
  // 1. The state
  // 2. Get the state
  // 3. Listen to updates on state
  // 4. Update the state

  // initialize local state
  let state

  // function to get the state
  const getState = () => state

  // return state by calling getState when createStore is called
  return {
    getState
  }
}
