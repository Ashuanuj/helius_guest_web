import { createAction,createRequestTypes, createActionsFromTypes, createCrudTypes,createCrudActions } from './actionHelper';

//Request Form Login page
export const LOG_IN = createRequestTypes('LOG_IN');
export const login = createActionsFromTypes(LOG_IN);

export const GUEST_LOG_IN = 'GUEST_LOG_IN';
export const guestLogIn = createAction(GUEST_LOG_IN);

export const HANDLE_ERROR = 'HANDLE_ERROR';
export const handleError = createAction(HANDLE_ERROR);

export const SET_COUNTER = 'SET_COUNTER';
export const setCounter = createAction(SET_COUNTER);

//load categories(dashboard)
export const LOAD_CATEGORIES = createRequestTypes('LOAD_CATEGORIES');
export const loadCategories = createActionsFromTypes(LOAD_CATEGORIES);

export const GET_CATEGORY_LIST = 'GET_CATEGORY_LIST';
export const getCategoryList = createAction('GET_CATEGORY_LIST');

//load subCategories(service click)
export const LOAD_SUB_CATEGORIES = createRequestTypes('LOAD_SUB_CATEGORIES')
export const loadSubCategories = createActionsFromTypes(LOAD_SUB_CATEGORIES)

export const GET_SUB_CATEGORIES = 'GET_SUB_CATEGORIES';
export const getSubCategories = createAction(GET_SUB_CATEGORIES)
//Initialize
export const INITIALIZE = 'INITIALIZE';
export const initialize = createAction(INITIALIZE);

export const HARD_STATE_RESET = 'HARD_STATE_RESET';
export const hardStateReset = createAction(HARD_STATE_RESET);

//Dashboard page
export const LOAD_SERVICE = 'LOAD_SERVICE';
export const loadService = createAction(LOAD_SERVICE);

export const SERVICE_DATA = createRequestTypes('SERVICE_DATA');
export const ServiceData = createActionsFromTypes(SERVICE_DATA);

export const LOAD_SERVICE_LOADING = 'LOAD_SERVICE_LOADING';
export const ServiceLoding = createAction(LOAD_SERVICE_LOADING);

//Service Category page
export const LOAD_CATEGORY= 'LOAD_CATEGORY';
export const loadCategory = createAction(LOAD_CATEGORY);

export const LOAD_CATEGORY_DATA = createRequestTypes('LOAD_CATEGORY_DATA');
export const CategoryData = createActionsFromTypes(LOAD_CATEGORY_DATA);

//SERVICE CATEGORY 
export const SERVICE_CATEGORY = createRequestTypes('SERVICE_CATEGORY');
export const loadServiceCategory = createActionsFromTypes(SERVICE_CATEGORY);

export const LOAD_SERVICE_CATEGORY= 'LOAD_SERVICE_CATEGORY';
export const getServiceCategory = createAction(LOAD_SERVICE_CATEGORY);

// SERVICE SUB CATEGORY PAGES
export const SERVICE_SUB_CATEGORY = createRequestTypes('SERVICE_SUB_CATEGORY');
export const loadServiceSUBCategory = createActionsFromTypes(SERVICE_SUB_CATEGORY);

export const LOAD_SERVICE_SUBCATEGORY = 'LOAD_SERVICE_SUBCATEGORY';
export const getServiceSubCategory = createAction(LOAD_SERVICE_SUBCATEGORY);

//subcategory2
export const SUB_CATEGORY_QTY= 'SUB_CATEGORY_QTY';
export const subCategoryQty = createAction(SUB_CATEGORY_QTY);

export const SUB_CATEGORY_QTY_DATA = createRequestTypes('SUB_CATEGORY_QTY_DATA');
export const subCategoryQtyData = createActionsFromTypes(SUB_CATEGORY_QTY_DATA);

// Front Office
export const LOAD_FRONT_OFFICE= 'LOAD_FRONT_OFFICE';
export const loadFrontOffice = createAction(LOAD_FRONT_OFFICE);

export const LOAD_FRONTOFFICE_DATA = createRequestTypes('LOAD_FRONTOFFICE_DATA');
export const loadFrontOfficeData = createActionsFromTypes(LOAD_FRONTOFFICE_DATA);

export const GUEST_REQUESTS = createRequestTypes('GUEST_REQUESTS');
export const guestRequests = createActionsFromTypes(GUEST_REQUESTS);

export const LOAD_GUEST_REQUESTS = 'LOAD_GUEST_REQUESTS';
export const loadGuestRequests = createAction(LOAD_GUEST_REQUESTS);

//Checkout page
export const CHECKOUT_PAGE= 'CHECKOUT_PAGE';
export const checkoutPage = createAction(CHECKOUT_PAGE);

export const CHECKOUT = createCrudTypes('CHECKOUT');
export const checkout = createCrudActions(CHECKOUT);

export const CREATE_REQUEST= 'CREATE_REQUEST';
export const createRequest = createAction(CREATE_REQUEST);

export const LOAD_CART_ITEMS = createRequestTypes('LOAD_CART_ITEMS');
export const loadCartItems = createActionsFromTypes(LOAD_CART_ITEMS)

export const CART_ITEMS= 'CART_ITEMS';
export const getCartItems = createAction(CART_ITEMS);

export const CHECKOUT_PAGE_DATA = createRequestTypes('CHECKOUT_PAGE_DATA');
export const checkoutPageData = createActionsFromTypes(CHECKOUT_PAGE_DATA);

export const TOAST = {
    PUSH: 'TOAST_PUSH',
    DISPLAY: 'TOAST_DISPLAY',
    CLOSE: 'TOAST_CLOSE',
};
export const toast = createActionsFromTypes(TOAST);

// export const APP_LOADED = 'APP_LOADED'
// export const appLoaded = createAction(APP_LOADED)

//cart details
export const PLACE_ORDER = createCrudTypes('PLACE_ORDER');
export const placeOrder = createCrudActions(PLACE_ORDER);

export const STORE_ORDER = 'STORE_ORDER';
export const storeOrder = createAction(STORE_ORDER)


export const HANDLE_HEADER = 'HANDLE_HEADER';
export const handle_header = createAction(HANDLE_HEADER);

export const CHECK_URL = 'CHECK_URL';
export const checkURL = createAction(CHECK_URL);

export const CHECK_URL1 = createRequestTypes('CHECK_URL1');
export const checkURL1 = createActionsFromTypes(CHECK_URL1);