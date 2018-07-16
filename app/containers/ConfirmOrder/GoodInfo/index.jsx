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
            <img src={infoData.image}/>
          </div>
          <div className="infoRight">
            <span className="props">{infoData.name + ' ' + infoData.subName}</span>
            <span className="price">￥{infoData.unitPrice}</span>
            <span className="number">×{infoData.needCount}</span>
          </div>
        </div>
        {
          infoData.gifts &&
          <div className="active">
            <div className="activeLeft">
              <span className="tip active1">赠</span>
            </div>
            <div className="activeRight">{infoData.gifts}</div>
          </div>
        }
      </div>
    )
  }
}

export default GoodInfo;