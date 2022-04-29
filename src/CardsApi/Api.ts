import {instance} from "./instance";


export const cardsApi = {
    getCards() {
        return instance.get('/cards/pack')
    },
    addCards(data: AddCardsType) {
        return instance.post('/cards/pack', data)
    },
    deleteCard(id: any) {
        return instance.delete('/cards/pack', {params: {id}})
    },
    register(email: string, password: string) {
        return instance.post<registerResponseType>('/auth/register', {email, password})
    },
    updateUser(name: string, avatar: string) {
        return instance.put<UpdateUserResponseType>('/auth/me', {name, avatar})
    },
    setUser() {
        return instance.post('/auth/me')
    },
    changePassword(password: string, resetPasswordToken: string) {
        return instance.post('/auth/set-new-password', {password, resetPasswordToken})
    },
    forgotPassword(email: string, from: string, message: string) {
        return instance.post('/auth/forgot', {email, from, message})
    }
}

export type registerResponseType = {
    email: string
    password: string
}

export type UpdateUserResponseType = {
    updatedUser: any,
    error?: string
}
export type GetCardsType = {
    packName?: string,
    min?: number
    sortPacks?: number
    page?: number
    pageCount?: number
    user_id?: string
}
export type AddCardsType = {
    cardsPack?: CardsPackType
}
export type CardsPackType = {
    name?: string
    deckCover?: string
    private?: boolean
}