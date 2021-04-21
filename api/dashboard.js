import * as FM from '../stores/fetch_methods';

export default {
    getDashboard: (full=null, mode = null) =>
        FM.post({
            url: `/api/dashboard?full=${full || ''}&mode=${mode || ''}`,
            payload: {}
        }).then((payload) => {
            return payload;
        }),
};
