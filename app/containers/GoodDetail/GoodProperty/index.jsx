import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class GoodProperty extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  showSelectPropsBox(e){
    this.props.showPropersFn(true);
  }
  componentDidMount(){
  }
  render() {
    const property = this.props.data;
    return (
      <div className="propertyBox" onClick={this.showSelectPropsBox.bind(this)}>
        <span className="label">可选</span>
        <span className="properties">
        {
          property.map((item, index) => {
            return (
              <span key={index}>
                {
                  index < property.length - 1 ?
                  <span key={index}>{`${item.desc}，`}</span>
                  : <span key={index}>{`${item.desc}`}</span>
                }
              </span>
            )
          })
        }
        </span>
      </div>
    )
  }
}

export default GoodProperty;