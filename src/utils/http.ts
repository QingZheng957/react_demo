import HttpClient, { HttpClientConfig } from 'axios-mapper'
import { getToken } from './cookies'

const https = (hasToken: Boolean = true) => {

    const config: HttpClientConfig = {
        headers: {
            token: getToken() ? getToken() : '',
            appid: '208iiZJ5VLltoAEnOVa8'
        },
    }

    let http = new HttpClient(config)

    // http.httpClient.interceptors.response.use((res)=>{
    //     if(!getToken()){
    //         history
    //     }
    // })

    return http
}
// https().httpClient.interceptors.response.use(
//     res => {
//         console.log(res,'响应拦截器')
//     },
//     function (error) {
//         // Do something with response error
//         return Promise.reject(error)
//     }
// )


export default https
