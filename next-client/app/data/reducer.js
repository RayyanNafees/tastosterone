const reducer = (state, action) => {
  if (action.type === 'FN-ERR') {
    return {
      ...state,
      msg: true,
      msgContent: 'first name cannot be empty',
    }
  }

  if (action.type === 'LN-ERR') {
    return {
      ...state,
      msg: true,
      msgContent: 'last name cannot be empty',
    }
  }

  if (action.type === 'ORG-ERR') {
    return {
      ...state,
      msg: true,
      msgContent: 'organization name cannot be empty',
    }
  }

  if (action.type === 'PASS1-ERR') {
    return {
      ...state,
      msg: true,
      msgContent: 'password field cannot be empty',
    }
  }
  if (action.type === 'PASS2-ERR') {
    return {
      ...state,
      msg: true,
      msgContent: 'organization name cannot be empty',
    }
  }
  if (action.type === 'PDM-ERR') {
    return {
      ...state,
      msg: true,
      msgContent: "password fields don't match",
    }
  }
}
