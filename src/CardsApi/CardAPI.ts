import {instance} from "./instance";
import {AddCardsType, GetCardsType} from "./Api";


export  const CardAPI = {
    getCards(params?: GetCardsType ) {
        return instance.get('/cards/pack', {params})
    },
    addCards(data: AddCardsType) {
        return instance.post('/cards/pack', data)
    },
    deleteCard(id: any) {
        return instance.delete('/cards/pack', {params: {id}})
    },
}




