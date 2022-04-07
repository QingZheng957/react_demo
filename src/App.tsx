import React from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from './route'
import './App.less'
import ProjectList from '@/pages/projectPage'

const Login = loadable(() => import('@/pages/loginPage'))

function App() {
    return (
        <Switch>
            <Route path="/" component={Login} exact></Route>
            <Route path='/project' component={ProjectList} exact></Route>
        </Switch>
    )
}

export default App

