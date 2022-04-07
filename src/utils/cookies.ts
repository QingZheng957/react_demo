import Cookies from 'js-cookie'
import {UserKeys} from '@/config/key'
//读取token
export const getToken = () => Cookies.get(UserKeys.TOKEN)
//设置token持久化存储
export const setToken = (token: string) => Cookies.set(UserKeys.TOKEN, token)