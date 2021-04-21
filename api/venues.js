import * as FM from '../stores/fetch_methods';

export default {
    getAll: () =>
        FM.post({
            url: `/api/venues`,
            payload: {}
        }).then((payload) => {
            return payload;
        }),
    get: (id) =>
        FM.post({
            url: `/api/venues/${id}`,
            payload: {}
        }).then((payload) => {
            return payload;
        }),
    create: (venue) =>
        FM.post({
            url: `/api/venue`,
            payload: venue
        }).then((payload) => {
            return payload;
        }),
    update: (venue) =>
        FM.put({
            url: `/api/venue`,
            payload: venue
        }).then((payload) => {
            return payload;
        })
};
