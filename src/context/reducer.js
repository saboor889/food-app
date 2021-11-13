export let data = {
    currentUser: {},
    CusUser : {},
    ResUser : {},
    dataGet : {},
    ProductId : {},
    authUser :{},
    ordersPending :[],
    ordersAccepted : [],
    ordersDelivered : []
}

export function reducer(state, action) {
    switch (action.type) {
        case "CURRENT_USER": {
            return {
                ...state,
                currentUser: action.payload
            }
        }
        case "RES_USER": {
            return {
                ...state,
                ResUser: action.payload
            }
        }
        case "CUS_USER": {
            return {
                ...state,
                CusUser: action.payload
            }
        }
        case "PRODUCT_GET_ID": {
            return {
                ...state,
                ProductId : action.payload
            }
        }
        case "AUTH_USER_DETAILS": {
 
            return {
                ...state,
                authUser : action.payload
            }
        }
        case "ORDERS_PENDING": {
            let userClone = [];
            userClone.push(action.payload)
            return {
                ...state,
                ordersPending : userClone
            }
        }
        case "ORDERS_ACCEPTED": {
            let userClone = [];
            userClone.push(action.payload)
            return {
                ...state,
                ordersAccepted : userClone
            }
        }
        case "ORDERS_DELIVERED": {
            let userClone = [];
            userClone.push(action.payload)
            return {
                ...state,
                ordersDelivered : userClone
            }
        }

        
        default:
            return state;

    }
}