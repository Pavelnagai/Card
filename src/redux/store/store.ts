import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {registerReducers} from "../reducers/registerReducers";
import {profileReducer} from "../reducers/profileReducer";
import {authReducer} from "../reducers/authReducer";
import {packsReducer} from "../reducers/packsReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import { cardsReducer } from "../reducers/cardsReducer";


export const rootReducer = combineReducers({
    register: registerReducers,
    profile: profileReducer,
    auth: authReducer,
    pack: packsReducer,
    card: cardsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export const useAppSelector: TypedUseSelectorHook<rootReducerType> = useSelector

export type rootReducerType = ReturnType<typeof rootReducer>