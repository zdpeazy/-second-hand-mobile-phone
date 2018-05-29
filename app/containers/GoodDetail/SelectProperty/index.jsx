import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class SelectProperty extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      style: {},
      number: this.props.number,
    }
  }
  componentWillMount(){
  }
  componentWillUnmount(){

  }
  componentDidMount(){
    document.getElementsByTagName('body')[0].className = 'forbidScroll';
    // let SelectPropertyBox = this.refs.SelectPropertyBox;
    // let SelectPropertyBoxHei = SelectPropertyBox.offsetHeight;
    let windowHei = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.setState({
      style: {
        transform: 'translateY(' + windowHei +'px)',
        WebkitTransform: 'translateY(' + windowHei +'px)',
        MozTransform: 'translateY(' + windowHei +'px)',
        MsTransform: 'translateY(' + windowHei +'px)',
        OTransform: 'translateY(' + windowHei +'px)',
      }
    })
    setTimeout(() => {
      this.setState({
        style: {
          transform: 'translateY(0)',
          WebkitTransform: 'translateY(0)',
          MozTransform: 'translateY(0)',
          MsTransform: 'translateY(0)',
          OTransform: 'translateY(0)',
          transition: 'all 0.3s ease-in',
          WebkitTransition: 'all 0.3s ease-in',
          MozTransition: 'all 0.3s ease-in',
          MsTransform: 'all 0.3s ease-in',
          OTransform: 'all 0.3s ease-in'
        }
      })
    }, 10)
  }
  hideSlectPropertyBox(e){
    document.getElementsByTagName('body')[0].className = '';
    let windowHei = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    setTimeout(() => {
      this.setState({
        style: {
          transform: 'translateY(' + windowHei +'px)',
          WebkitTransform: 'translateY(' + windowHei +'px)',
          MozTransform: 'translateY(' + windowHei +'px)',
          MsTransform: 'translateY(' + windowHei +'px)',
          OTransform: 'translateY(' + windowHei +'px)',
          transition: 'all 0.3s ease-in',
          WebkitTransition: 'all 0.3s ease-in',
          MozTransition: 'all 0.3s ease-in',
          MsTransform: 'all 0.3s ease-in',
          OTransform: 'all 0.3s ease-in'
        }
      })
    }, 10);
    setTimeout(() => {
      this.props.hidePropersFn(false);
    }, 310)
  }
  handleDecreaseNumber(e){
    let currentNumber = this.state.number;
    if(currentNumber > 1){
      currentNumber = currentNumber - 1;
    } else {
      currentNumber = 1
    }
    this.props.getGoodNumberFn(currentNumber);
    this.setState({
      number: currentNumber
    })
  }
  handleAddNumber(e){
    let currentNumber = this.state.number + 1;
    this.props.getGoodNumberFn(currentNumber);
    this.setState({
      number: currentNumber
    })
  }
  render() {
    const productInfo = this.props.productInfo;
    const imgUrl = productInfo.plans.split(',')[0]
    const property = this.props.data;
    return (
      <div className="selectBox" style={this.state.style}>
        <div className="SelectPropertyBox" ref="SelectPropertyBox">
          <div className="paropertyHeader">
            <div className="imgBox">
              <img src={imgUrl} />
            </div>
            <div className="goodInfo">
              <div className="infoTop">
              </div>
              <div className="name">{productInfo.name + ' '+ productInfo.subName}</div>
              <div className="price">￥{productInfo.unitPrice}</div>
              <div className="close" onClick={this.hideSlectPropertyBox.bind(this)}>
                <i className="close-icon"></i>
              </div>
            </div>
          </div>
          <div className="properties">
            <ul className="iscrollWicket">
            {
              property.map((item, index) => {
                return (
                  <li className="propsBox" key={index}>
                    <h3>{item.name}</h3>
                    <div className="propsList">
                      <span className="props act">{item.desc}</span>
                    {
                      /*item.list.map((props, propsId) => {
                        return (
                          <span className="props" key={propsId}>{props.name}</span>
                        )
                      })*/
                    }
                    </div>
                  </li>
                )
              })
            }
            <li className="propsBox">
              <h3>数量</h3>
              <div className="propsList numberBox">
                <span className={`${this.state.number == 1 ? 'minLow' : ''} decrease icon`} onClick={this.handleDecreaseNumber.bind(this)}></span>
                <span className="number">{this.state.number}</span>
                <span className="add icon" onClick={this.handleAddNumber.bind(this)}></span>
              </div>
            </li>
             </ul>
          </div>
        </div>
      </div>
    )
  }
  componentWillUnmount(){
    document.getElementsByTagName('body')[0].className = '';
  }
}

export default SelectProperty;