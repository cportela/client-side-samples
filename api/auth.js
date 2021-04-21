import * as FM from '../stores/fetch_methods';

export default {
    login: (user) => {
        FM.setAuthorization(null);
        return FM.post({
            url: '/api/auth/login',
            payload: user
        }).then((tokenPayload) => {
            return tokenPayload;
        })
    },
    reset: (email, zip, pwd) => {
        return FM.post({
            url: '/api/auth/reset',
            payload: { email, zip, pwd }
        }).then(payload => {
            return payload;
        })
    },
    logout: () =>
        FM.del({
            url: '/api/auth/logout'
        }).then(payload => {
            FM.setAuthorization(null);
            return payload;
        }),
    signup: (newUser, request_operator) =>
        FM.post({
            url: '/api/auth/signup',
            payload: { user: newUser, request_operator }
        }).then((tokenPayload) => {
            FM.setAuthorization(tokenPayload.token);
            return tokenPayload;
        }),
    getProfile: (id) =>
        FM.post({
            url: `/api/users/${id}`
        }).then((payload) => {
            return payload;
        }),
    updateProfile: (user) =>
        FM.put({
            url: `/api/user`,
            payload: user
        }).then((payload) => {
            return payload;
        }),
    createProfile: () =>
        FM.post({
            url: `/api/users`
        }).then((payload) => {
            return payload;
        }),
};
