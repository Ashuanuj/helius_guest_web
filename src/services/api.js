import callApi from '../utility/call-api';
//checkurl
export const checkurl = ap => callApi('url', ap, 'post',undefined);

//login 
export const login = ap => callApi('authentication/login', ap, 'post', undefined);

//service 
export const getGuestServices = () => callApi('api/guestWebApp/services', undefined, 'get')

//service category
export const getServiceCategory = id => callApi(`api/guestWebApp/service-category/${id}`, undefined, 'get', {id:id}); 

//service sub category
export const getServiceSubCategory = id => callApi(`api/guestWebApp/service-sub-category/${id}`, undefined, 'get', {id: id});

//before cart
export const placeOrder = ap => callApi('api/guestWebApp//add-dummy', ap, 'post');

// order details
export const getCartDetails = id => callApi(`api/guestWebApp/get-dummy/${id}`, undefined, 'get', {area_id: id})

//place order 
export const requestCreate = ap => callApi('api/guestWebApp/cart', ap, 'post');

// guest request
export const loadGuestRequests = ap => callApi('api/guestWebApp/actions', ap, 'post', undefined);