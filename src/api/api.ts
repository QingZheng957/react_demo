import https from '@/utils/http'
import { Method, ContentType } from 'axios-mapper'

//定义登录接口参数
interface LoginParams {
    appSecret: string
    username: string
    telephone: string
}
export const login = (data: LoginParams) => {
    return https().request<any>('/loginApp', Method.POST, data, ContentType.json)
}

//获取工程列表
export const getProjectList = (params: { page: number; pageSize: number }) => {
    return https().request<{
        data: {
            list: any[],
            meta: any
        }
    }>('/api/projects', Method.GET, params, ContentType.form)
}

//删除工程
export const deleteById = (id: number | string) => {
    return https().request<any>(
        `api/projects/${id}`,
        Method.DELETE,
    )
}

//创建工程
export const createPorject = (data: any) => {
    return https().request<any>(
        '/api/projects',
        Method.POST,
        data,
        ContentType.form
    )
}

//编辑工程
export const updatePorject = (data: any, id) => {
    console.log(data)
    return https().request<any>(
        `/api/projects/${id}`,
        Method.PUT,
        data,
        ContentType.form
    )
}