var user;
if (process.browser) {
  user = localStorage.getItem('user');
}
const userReducer = (
  state = typeof window !== 'undefined' ? localStorage.getItem('user') : null,
  action
) => {
  switch (action.type) {
    case 'setusername':
      state = action.payload;
      return state;
    case 'removeuser':
      state = '';
      return state;
    default:
      return state;
  }
};

export default userReducer;
