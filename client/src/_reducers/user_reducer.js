import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types'



export default function(state = {}, action) {
    switch(action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        default:
            return state;
    }
}   

// userData : action.payload에 아래 코드들이 들어간다.
// res.status(200).json({
//     _id: req.user._id,
//     isAdmin: req.user.role === 0 ? false : true,
//     isAuth: true,
//     email: req.user.email,
//     name: req.user.name,
//     lastname: req.user.lastname,
//     role: req.user.role,
//     image: req.user.image
//   })