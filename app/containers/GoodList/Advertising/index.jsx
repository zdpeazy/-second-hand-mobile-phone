import React from 'react';

import './style.less';

import goodListBanner from '../../../static/img/goodList-banner.jpg';
import promiseIcon1 from '../../../static/img/promise-icon1.png';
import promiseIcon2 from '../../../static/img/promise-icon2.png';
import promiseIcon3 from '../../../static/img/promise-icon3.png';
import promiseIcon4 from '../../../static/img/promise-icon4.png';

class Advertising extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render(){
		return (
			<div className="adverBox">
				<h4 className="banner">
					<img src={goodListBanner} />
				</h4>
				<ul className="guarantee">
					<li className="item">
						<img src={promiseIcon1} />
						<p>51项质检</p>
					</li>
					<li className="item">
						<img src={promiseIcon2} />
						<p>担保交易</p>
					</li>
					<li className="item">
						<img src={promiseIcon3} />
						<p>官方质保</p>
					</li>
					<li className="item">
						<img src={promiseIcon4} />
						<p>顺丰包邮</p>
					</li>
				</ul>
			</div>
		)
	}
}

export default Advertising;