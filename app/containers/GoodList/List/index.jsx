import React from 'react';
import {  hashHistory, browserHistory, Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    goGoodDetail(goodId){
        hashHistory.push('/GoodDetail/' + goodId);
    }
    render() {
        return (
            <ul className="listBox">
                {
                  this.props.data.map((item, index)=>{
                    return (
                        <li className="item" key={index} data-id={item.id} onClick={this.goGoodDetail.bind(this, item.id)}>
                            <div className="imgBox">
                                <img className="goodImg" src={item.image}/>
                            </div>
                            <div className="info">
                                <span className="name">{item.name + ' ' + item.subName}</span>
                                <span className="desc">{item.desc}</span>
                                <span className="price">
                                    <span className="newPrice">￥{item.unitPrice}</span>
                                    <span className="oldPrice">新机含税价￥{item.newMachineTaxPrice}</span>
                                </span>
                            </div>
                        </li>
                    )
                  })
                }
            </ul>
        );
    }
}

export default List;