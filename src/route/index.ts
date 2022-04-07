import Loadable from 'react-loadable'
//导入页面加载效果
import PageLoading from './skeleton/pageLoading'

//组件动态加载
const loaderFn = (loader, loading = PageLoading) => {
    return Loadable({
        loader,
        loading,
    })
}
export default loaderFn
