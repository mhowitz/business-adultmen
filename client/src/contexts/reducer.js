export const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        _id: action._id
      }

    case "logout":
      return {
        ...state,
        loggedIn: false,
        username: "",
        _id: ""
      }

    default:
      return state
  }
}

export const initialState = {
  username: "",
  _id: "",
  loggedIn: false
}