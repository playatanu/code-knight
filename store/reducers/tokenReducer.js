var token;
if (process.browser) {
  token = localStorage.getItem('token');
}
const tokenReducer = (
  state = typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  action
) => {
  switch (action.type) {
    case 'settoken':
      state = action.payload;
      return state;
    case 'removeuser':
      state = '';
      return state;
    default:
      return state;
  }
};

export default tokenReducer;
