import React from 'react';
import {hashHistory} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class GoodInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  activeLive(type){
    console.log(type)
    let activeTxt = '赠'
    let activeArr = [
      {
        type: 1,
        txt: '赠'
      },
      {
        type: 2,
        txt: '减'
      }
    ]
    activeArr.map((item, index) => {
      if(item.type == type){
        activeTxt = item.txt;
      }
    })
    return activeTxt;
  }
  componentDidMount(){
  }
  render() {
    let infoData = this.props.data;
    return (
      <div className="infoBox">
        <div className="info">
          <div className="infoLeft">
            <img src={infoData.commodity.image}/>
          </div>
          <div className="infoRight">
            <span className="props">{infoData.commodity.name + ' ' + infoData.commodity.subName}</span>
            <span className="price">￥{infoData.commodity.unitPrice}</span>
            <span className="number">×{infoData.order.needCount}</span>
          </div>
        </div>
        {
          infoData.order.gifts &&
          <div className="active">
            <div className="activeLeft">
              <span className="tip active1">赠</span>
            </div>
            <div className="activeRight">{infoData.order.gifts}</div>
          </div>
        }
      </div>
    )
  }
}

export default GoodInfo;