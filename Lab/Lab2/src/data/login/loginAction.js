export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export function loginReducer(state, action) {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };

    case SET_PASSWORD:
      return { ...state, password: action.payload };

    case LOGIN_START:
      return { ...state, loading: true, error: "" };

    case LOGIN_SUCCESS:
      return { ...state, loading: false };

    case LOGIN_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
