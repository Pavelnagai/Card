import {instance} from "./instance";
import {AddCardsType} from "./Api";

export  const CardAPI = {
    getCards() {
        return instance.get('/cards/pack')
    },
    addCards(data: AddCardsType) {
        return instance.post('/cards/pack', data)
    },
    deleteCard(id: any) {
        return instance.delete('/cards/pack', {params: {id}})
    },
}