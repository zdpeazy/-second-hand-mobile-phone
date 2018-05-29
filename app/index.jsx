import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory } from 'react-router'

import configureStore from './store/store'
import RouteMap from './router/routeMap'

// 通用样式
import './static/css/common.less'

// 创建 Redux 的 store 对象
const store = configureStore();

render(
		<Provider store={store}>
      <RouteMap history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
)