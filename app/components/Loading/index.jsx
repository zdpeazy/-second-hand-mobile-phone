import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import loadingPng from '../../static/img/loading.png';

import './style.less';

class Loading extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div className="loading-layer">
        <div className="loading-inner">
          <img src={loadingPng} />
        </div>
      </div>
    )
  }
}

export default Loading