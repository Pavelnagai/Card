import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {registerReducers} from "../reducers/registerReducers";
import {profileReducer} from "../reducers/profileReducer";
import {authReducer} from "../reducers/authReducer";
import {cardReducer} from "../reducers/cardReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";


export const rootReducer = combineReducers({
    register: registerReducers,
    profile: profileReducer,
    auth: authReducer,
    card: cardReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export const useAppSelector: TypedUseSelectorHook<rootReducerType> = useSelector

export type rootReducerType = ReturnType<typeof rootReducer>