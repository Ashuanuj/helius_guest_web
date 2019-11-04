import { isArray } from 'lodash';
import { Base64 } from 'js-base64';
import jwt_decode from 'jwt-decode';

export const setAuthData = (data) => new Promise((resolve, reject) => {
    
    console.log(data,'lllllllllllllllllll')
    if (!data.guest || !data.authorization || !data.authorization.token || !data.guest.id)
    {
        reject('Inavlid user object sent!');
    }
    try
    {
        localStorage.setItem('instructions','')
       // localStorage.setItem('cartcount',0)
        localStorage.setItem('accessToken', data.authorization.token);
        localStorage.setItem('guestId', data.guest.id);
        localStorage.setItem('guestName', data.guest.lastName);
        localStorage.setItem('roomNo', data.roomNo);
        localStorage.setItem('areaId', data.guest.areaId);
        resolve();
    }
    catch (e)
    {
        reject({error: {customMessage: 'Could not save data to local storrage!'}});
    }
});