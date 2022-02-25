const setUsername = (value) => {
  return {
    type: 'setusername',
    payload: value,
  };
};

const removeUser = () => {
  return {
    type: 'removeuser',
  };
};

export { setUsername, removeUser };
