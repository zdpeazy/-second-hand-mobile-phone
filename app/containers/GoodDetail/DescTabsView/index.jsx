import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class DescTabsView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentDidMount(){
  }
  render() {
    let tabContent = this.props.data;
    return (
      <div className="descBox" dangerouslySetInnerHTML={{ __html: tabContent }}>
      </div>
    )
  }
}

export default DescTabsView;