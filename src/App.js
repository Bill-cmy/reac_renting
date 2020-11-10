import React, { Component } from 'react'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import Home from 'pages/home'
import Citylist from 'pages/citylist'
import Map from 'pages/map'

export default class App extends Component {
  render() {
    return (
      <div>
        {/*l路由定义 */}
        <HashRouter>

          {/* 导航区 */}

          {/* 默认路径 自动跳转页面*/}
          <Route exact path='/'>
            <Redirect to='/Home' />
          </Route>
          {/* 路径和组件配置 */}
          {/* 大首页页面 */}
          <Route path='/home' component={Home} />
          {/* 城市页面 */}
          <Route path='/citylist' component={Citylist} />
          {/* 地图页面 */}
          <Route path='/map' component={Map} />
        </HashRouter>
      </div>
    )
  }
}
