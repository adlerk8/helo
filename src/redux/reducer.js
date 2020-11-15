const initialState = {
    username: '',
    profile: '',
    userId: 0
}

const LOGIN_USER = "LOGIN_USER";
const GET_USER_POSTS = "GET_USER_POSTS";

export function loginUser(user){
    return {
        type: LOGIN_USER,
        payload: user
    }
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER:
            return {...state, user: action.payload}
        default:
            return state
    }
}
