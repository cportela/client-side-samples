import * as FM from '../stores/fetch_methods';

export default {
    getAll: () =>
        FM.post({
            url: `/api/sanctioning_bodies`,
            payload: {}
        }).then((payload) => {
            return payload;
        }),
    get: (id) =>
        FM.post({
            url: `/api/sanctioning_bodies/${id}`,
            payload: {}
        }).then((payload) => {
            return payload;
        }),
    create: (venue) =>
        FM.post({
            url: `/api/sanctioning_body`,
            payload: venue
        }).then((payload) => {
            return payload;
        }),
    update: (venue) =>
        FM.put({
            url: `/api/sanctioning_body`,
            payload: venue
        }).then((payload) => {
            return payload;
        })
};
