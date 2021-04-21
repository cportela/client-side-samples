import * as FM from '../stores/fetch_methods';

export default {
    getAll: (event_id) =>
        FM.post({
            url: `/api/entries/event/${event_id}`,
            payload: {}
        }).then((payload) => {
            return payload;
        }),
    get: (id) =>
        FM.post({
            url: `/api/entries/${id}`,
            payload: {}
        }).then((payload) => {
            return payload;
        }),
    create: (entry) =>
        FM.post({
            url: `/api/entry`,
            payload: entry
        }).then((payload) => {
            return payload;
        }),
    update: (entry) =>
        FM.put({
            url: `/api/entry`,
            payload: entry
        }).then((payload) => {
            return payload;
        })
};
