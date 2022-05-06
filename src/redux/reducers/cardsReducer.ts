import {Dispatch} from "redux";
import {AddCardResponseType, CardAPI, GetCardRequestType, GetCardType, RequestAddType} from "../../CardsApi/CardAPI";

const InitialState = {
    cards: [] as ResponseCardType[],
    cardsTotalCount: 2,
    maxGrade: 1000 as number | undefined,
    minGrade: 0 as number | undefined,
    page: 1 as number | undefined,
    pageCount: 4 as number | undefined,
    searchCardQuestion: "" as string | undefined,
    sortCards: "" as string | undefined
}
export type ResponseCardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
    comment: string
    more_id: string
}

type InitialStateType = typeof InitialState

export const cardsReducer = (state =InitialState, action: ActionType) => {
    switch (action.type) {
        case "CARD/GET_CARDS":
            return {
                ...state,
                cards: action.payload.data.cards,
                page: action.payload.data,
                cardsTotalCount: action.payload.data.cardsTotalCount,
                maxGrade: action.payload.data.maxGrade,
                minGrade: action.payload.data.minGrade,
                packUserId: action.payload.data.packUserId,
                pageCount: action.payload.data.pageCount
            }
        case "CARD/ADD_CARD":
            return {
                ...state,
                cards: [action.payload.data.newCard, ...state.cards]
            }
        case "CARD/DELETE_CARD":
            return {
                ...state, cards: state.cards.filter(el => el._id !== action.payload.id)
            }
        default:
            return state
    }
}
const getCardAC = (data: GetCardRequestType) => ({
    type: 'CARD/GET_CARDS',
    payload: {data}
} as const)

const addCardAC = (data: RequestAddType) => ({
    type: 'CARD/ADD_CARD',
    payload: {
        data
    }
} as const)
const deleteCardAC = (id: string) => ({
    type: 'CARD/DELETE_CARD',
    payload: {
        id
    }
} as const)
export const getCard = (param?: GetCardType) => async (dispatch: Dispatch) => {
    try {
        const res = await CardAPI.getCards(param)
        dispatch(getCardAC(res.data))
    } catch (e) {
        console.log('Get_Card')
    }
}

export const addCard = (data: AddCardResponseType) => async (dispatch: Dispatch) => {
    try {
        const res = await CardAPI.addCard(data)
        dispatch(addCardAC(res.data))
    } catch (e) {

    }
}

export const deleteCard = (id: string) => async (dispatch: Dispatch) => {
    try {
        const res = await CardAPI.deleteCard(id)
        dispatch(deleteCardAC(id))
    } catch (e) {

    }
}


type ActionType = GetCardAC | AddCardACType | DeleteCardACType
type GetCardAC = ReturnType<typeof getCardAC>
type AddCardACType = ReturnType<typeof addCardAC>
type DeleteCardACType = ReturnType<typeof deleteCardAC>


