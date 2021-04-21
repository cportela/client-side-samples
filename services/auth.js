import * as FM from '../stores/fetch_methods';

export default {
  getCurrentAuth: () =>
    FM.get({
      url: '/mobile/auth/current'
    })
    .then((payload) => {
      return payload.data[0];
  }),

  loginUser: (user) =>
    FM.post({
      url: '/mobile/auth',
      payload: user
    })
    .then((tokenPayload) => {
      return tokenPayload.token;
  }),

  logOutUser: () =>
    FM.del({
      url: '/mobile/auth'
    }).then((response) => {
      return response;
    })
};
