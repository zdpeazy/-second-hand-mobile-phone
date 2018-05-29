import React from 'react';
import { Router, Route, IndexRoute } from 'react-router'

import App from '../containers/App';
import Login from '../containers/Login';
import GoodList from '../containers/GoodList';
import GoodDetail from '../containers/GoodDetail';
import ConfirmOrder from '../containers/ConfirmOrder';
import AddressList from '../containers/AddressList';
import payDetail from '../containers/payDetail';
import ResellOrder from '../containers/ResellOrder';
import SellOrder from '../containers/SellOrder';
import OrderDetail from '../containers/OrderDetail';
import ResellConfirmOrder from '../containers/ResellConfirmOrder';
import ResellDetail from '../containers/ResellDetail';
import NotFound from '../containers/NotFound';

class RouterMap extends React.Component {
	updateHandle() {
      console.log('每次router变化之后都会触发');
  }
	render() {
		return (
			<Router history={this.props.history}>
				<Route path='/' component={App}>
					<IndexRoute component={Login}/>
					<Route path='/Login' component={Login}/>
					<Route path='/GoodList' component={GoodList}/>
					<Route path='/GoodDetail/:goodId' component={GoodDetail}/>
					<Route path='/ConfirmOrder/:orderId' component={ConfirmOrder}/>
					<Route path='/AddressList' component={AddressList}/>
					<Route path='/payDetail' component={payDetail}/>
					<Route path='/ResellOrder' component={ResellOrder}/>
					<Route path='/SellOrder' component={SellOrder}/>
					<Route path='/OrderDetail/:orderId' component={OrderDetail}/>
					<Route path='/ResellConfirmOrder' component={ResellConfirmOrder}/>
					<Route path='/ResellDetail' component={ResellDetail}/>
					<Route path='*' component={NotFound}/>
				</Route>
			</Router>
		)
	}
}

export default RouterMap;
