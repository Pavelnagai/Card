import {Dispatch} from "redux";
import {AddCardsType, GetCardsType} from "../../CardsApi/Api";
import {CardAPI} from "../../CardsApi/CardAPI";

export type CardType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: false
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}
export type InitialStateCardType = {
    cardPacks: CardType []
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number | null
    token: string | null
    tokenDeathTime: number | null
}
const initialState: InitialStateCardType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: null,
    token: null,
    tokenDeathTime: null,
}

export const cardReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "GET_CARDS":
            return {
                ...state,
                cardPacks: action.payload.data.cardPacks,
                cardPacksTotalCount: action.payload.data.cardPacksTotalCount,
                maxCardsCount: action.payload.data.maxCardsCount,
                minCardsCount: action.payload.data.minCardsCount,
                page: action.payload.data.page,
                pageCount: action.payload.data.pageCount,
                token: action.payload.data.token,
                tokenDeathTime: action.payload.data.tokenDeathTime
            }
        default:
            return state
    }
}
export const getCardsAC = (data: InitialStateCardType) => ({
    type: "GET_CARDS",
    payload: {
        data
    }
} as const)

type GetCardsTypeAC = ReturnType<typeof getCardsAC>
type ActionType = GetCardsTypeAC

export const getCards = (data: GetCardsType) => async (dispatch: Dispatch) => {
    try {
            const res = await CardAPI.getCards(data)
            dispatch(getCardsAC(res.data))
    } catch (e) {

    }
}

export const addCardsTC = (data: AddCardsType) => async (dispatch: any) => {
    try {
        const res = await CardAPI.addCards(data)
        dispatch(getCards({}))
    } catch (e) {

    }
}

export const deleteCardTC = (id: any) => async (dispatch: any) => {
    try {
        const res = await CardAPI.deleteCard(id)
        dispatch(getCards({}))
    } catch (e) {

    }
}