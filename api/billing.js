import * as FM from '../stores/fetch_methods';

export default {
    getAllCards: () =>
        FM.post({
            url: `/api/cards`,
            payload: {}
        }).then((payload) => {
            return payload;
        }),
    getCard: (id) =>
        FM.post({
            url: `/api/cards/${id}`,
            payload: {}
        }).then((payload) => {
            return payload;
        }),
    createCard: (card) =>
        FM.post({
            url: `/api/card`,
            payload: card
        }).then((payload) => {
            return payload;
        }),
    deleteCard: (card) =>
        FM.del({
            url: `/api/card`,
            payload: card
        }).then((payload) => {
            return payload;
        }),
    //Charges
    getAllCharges: () =>
        FM.post({
            url: `/api/charges`,
            payload: {}
        }).then((payload) => {
            return payload;
        }),
    getCharge: (id) =>
        FM.post({
            url: `/api/cards/${id}`,
            payload: {}
        }).then((payload) => {
            return payload;
        }),
    createCharge: (charge) =>
        FM.post({
            url: `/api/charge`,
            payload: charge
        }).then((payload) => {
            return payload;
        }),
    registerAndCharge: (charge) =>
        FM.post({
            url: `/api/registerAndCharge`,
            payload: charge
        }).then((payload) => {
            return payload;
        })
};
