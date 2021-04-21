import * as FM from '../stores/fetch_methods';

export default {
    getAll: (mode, text = '', limit = 300, sort_order = 'desc', include_mine = false, only_eligible = true) =>
        FM.post({
            url: `/api/events?mode=${mode}&text=${text}&limit=${limit}&sort_order=${sort_order}&include_mine=${include_mine}&only_eligible=${only_eligible}`,
            payload: {}
        }).then((payload) => {
            return payload;
        }),
    get: (id) =>
        FM.post({
            url: `/api/events/${id}`,
            payload: {}
        }).then((payload) => {
            return payload;
        }),
    create: (event) =>
        FM.post({
            url: `/api/event`,
            payload: event
        }).then((payload) => {
            return payload;
        }),
    update: (event) =>
        FM.put({
            url: `/api/event`,
            payload: event
        }).then((payload) => {
            return payload;
        })
};
