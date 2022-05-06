import {instance} from "./instance";
import {AddCardsType, GetCardsType} from "./Api";


export const CardAPI = {
    getPacks(params?: GetCardsType) {
        return instance.get('/cards/pack', {params})
    },
    addPack(data: AddCardsType) {
        return instance.post('/cards/pack', data)
    },
    deletePack(id: any) {
        return instance.delete('/cards/pack', {params: {id}})
    },
    getCards(params?: GetCardType) {
        return instance.get<GetCardRequestType>('/cards/card', {params})
    },
    addCard(data: AddCardResponseType) {
        return instance.post<RequestAddType>('/cards/card', data)
    },
    deleteCard(id: string) {
        return instance.delete('/cards/card', {params: id})
    }
}
export type CardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}
export type AddCardResponseType = {
    card: CardType
}
export type RequestAddType = {
    newCard: CardType
}

export type GetCardType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: number
    page?: number
    pageCount?: number
}
export type GetCardRequestCardsArrayType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
export type GetCardRequestType = {
    cards: Array<GetCardRequestCardsArrayType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}





