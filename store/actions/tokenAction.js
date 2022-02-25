const settoken = (value) => {
  return {
    type: 'settoken',
    payload: value,
  };
};

const removeToken = () => {
  return {
    type: 'removeuser',
  };
};

export { settoken, removeToken };
