import {instance} from "./instance";

export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType>('auth/login', data)
    },
    me(){
      return instance.post<ResponseType>('/auth/me')
    },
    logOut() {
        return instance.delete<ResponseType>('/auth/me')
    },
}

export type ResponseType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
}