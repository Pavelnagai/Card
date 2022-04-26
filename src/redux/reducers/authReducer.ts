import { cardsApi} from '../../CardsApi/Api';
import {Dispatch} from 'redux';
import {authApi, LoginParamsType} from "../../CardsApi/LoginAPI";

type InitialStateType = typeof initialState
const initialState = {
    isAuth: false,
    isInitialized: false
};
type ActionType = AuthActionType | InitializedType
export const authReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'AUTH':
            return {...state, isAuth: action.payload.isAuth};
        case "AUTH_INITIALIZED":
            return  {...state, isInitialized: action.payload.isInitialized}
        default:
            return state;
    }
};

type AuthActionType = ReturnType<typeof auth>
type InitializedType = ReturnType<typeof initialized>
const auth = (isAuth: boolean) => ({type: 'AUTH', payload: {isAuth}} as const);
const initialized = (isInitialized: boolean) => ({type: "AUTH_INITIALIZED", payload: {isInitialized}} as const)

export const authTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    authApi.login(data).then(res => {
        return res;
    })
        .then((res) => {
            if (res.data._id) {
                dispatch(auth(true));
            }
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
        })
        .finally(()=> {
                dispatch(initialized(true))
        }
        );

};

export const authLogOut = () => (dispatch: Dispatch) => {
    authApi.logOut()
        .then((res) => {
            dispatch(auth(false));
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
        });
};

export const isInitializedTC = () =>  async (dispatch: Dispatch) => {
    try{
        const res = await cardsApi.getCards()
    }catch (e) {

    }finally {
        dispatch(initialized(true))
    }
}