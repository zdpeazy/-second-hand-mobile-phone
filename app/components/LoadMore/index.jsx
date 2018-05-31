import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import loadingImg from '../../static/img/loadingMore.png'
import './style.less'

class LoadMore extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentWillReceiveProps(props) {
    this.shouldLoadMore && this.shouldLoadMore(props)
  }

  render() {
    let isLoadingMore = this.props.isLoadingMore;
    let goodleg = this.props.goodLeg;
    return (
      <div className="load-more" ref="wrapper">
        {
          isLoadingMore &&
          <img className="loading-flower" src={loadingImg} />
        }
        {
          isLoadingMore
          ? <span>正在加载...</span>
          : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
        }
      </div>
    )
  }

  componentDidMount() {
    // 使用滚动时自动加载更多
    const loadMoreFn = this.props.loadMoreFn;
    const wrapper = this.refs.wrapper;
    let timeoutId
    function callback() {
        const top = wrapper.getBoundingClientRect().top;
        let footerHei = '';
        if(document.getElementById('tabBar-box')){
          footerHei = document.getElementById('tabBar-box').offsetHeight;
        }
        const windowHeight = window.screen.height;
        if (top && top < windowHeight) {
            // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
            loadMoreFn()
        }
    }
    window.addEventListener('scroll', function () {
        if (this.props.isLoadingMore) {
            return
        }
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(callback, 50)
    }.bind(this), false);
  }

  shouldLoadMore(flag) {
    if(flag.shouldLoad) {
      const loadMoreFn = flag.loadMoreFn
      const wrapper = this.refs && this.refs.wrapper
      wrapper && this.autoLoadMore.bind(this, wrapper, loadMoreFn)()
      flag.changeShouldLoadState()
    }
  }
  componentWillUnmount(){

  }

  // autoLoadMore(wrapper, loadMoreFn) {
  //   console.log('loadMore')
  //   const top = wrapper.getBoundingClientRect().top
  //   const windowHeight = window.screen.height
  //   if(top && top<windowHeight - 6) {
  //     // 当 '加载更多' 四个字出现在可视区域内时,
  //     // 自动执行 获取更多函数，实现自动下拉加载效果
  //     loadMoreFn()
  //   }
  // }

  loadMoreHandle() {
    this.props.loadMoreFn()
  }
}

export default LoadMore