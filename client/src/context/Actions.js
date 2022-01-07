export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFail = (err) => ({
  type: "LOGIN_FAIL",
  payload: err,
});

export const LogoutSuccess = () => ({
  type: "LOGOUT_SUCCESS",
});

export const UpdateStart = (userCredentials) => ({
  type: "UPDATE_START",
});

export const UpdateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const UpdateFail = (err) => ({
  type: "UPDATE_FAIL",
  payload: err,
});
