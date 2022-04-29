import {Dispatch} from "redux";
import {AddCardsType, cardsApi, CardsPackType} from "../../CardsApi/Api";

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
    cardPacks: CardType [] | null
    cardPacksTotalCount: number | null
    maxCardsCount: number | null
    minCardsCount: number | null
    page: number | null
    pageCount: number | null
    token: string | null
    tokenDeathTime: number | null
}
const initialState: InitialStateCardType = {
    cardPacks: null,
    cardPacksTotalCount: null,
    maxCardsCount: null,
    minCardsCount: null,
    page: null,
    pageCount: null,
    token: null,
    tokenDeathTime: null,
}

export const cardReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "GET_CARDS":
            return {
                state: action.payload.data
            }
        case "ADD_CARD": {
            return {
               ...state, ...state.cardPacks, cardPacks: {...action.payload.data , ...state.cardPacks}
            }
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

export const addCardAC = (data: CardType) => ({
    type: "ADD_CARD",
    payload: {
        data
    }
} as const)
type AddCardType = ReturnType<typeof addCardAC>
type GetCardsType = ReturnType<typeof getCardsAC>
type ActionType = GetCardsType | AddCardType

export const getCards = () => async (dispatch: Dispatch) => {
    try {
        const res = await cardsApi.getCards()
        dispatch(getCardsAC(res.data))
    } catch (e) {

    }
}

export const addCardsTC = (data: AddCardsType) => async (dispatch: Dispatch) => {
    try {
        const res = await cardsApi.addCards(data)

        dispatch(addCardAC(res.data.newCardsPack))
    } catch (e) {

    }
}

export const deleteCardTC = (id: any) => async (dispatch: Dispatch) => {
    try {
        const res = await cardsApi.deleteCard(id)
        dispatch(getCardsAC(res.data))
    } catch (e) {

    }
}