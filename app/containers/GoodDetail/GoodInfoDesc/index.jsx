import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class GoodInfoDesc extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  activeLive(type){
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
    /*不能直接打印对象的props，必须接受后在打印对象的属性*/
    let infoDesc = this.props.data;
    return (
      <div className="detailInfoBox">
        <h3 className="title">{infoDesc.name + ' ' +infoDesc.subName}</h3>
        <div className="price">
          <span className="newPrice">￥{infoDesc.unitPrice}</span>
          {
            infoDesc.newMachineTaxPrice &&
            <span className="oldPrice">新机含税价￥{infoDesc.newMachineTaxPrice}</span>
          }
        </div>
        {
          infoDesc.gifts && 
          <div className="active">
            {/*<span className={`tip active${infoDesc.activity_tips.type}`}>{this.activeLive(infoDesc.activity_tips.type)}</span>*/}
            <span className="tip active1">赠</span>
            <span className="desc">{infoDesc.gifts}</span>
          </div>
        }
      </div>
    )
  }
}

export default GoodInfoDesc;