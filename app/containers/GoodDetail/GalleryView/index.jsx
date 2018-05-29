import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactSwipe from 'react-swipe';

import './style.less';

class GalleryView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      index: 0,
      galleryView: []
    }
  }
  componentWillMount(){
    this.setState({
      galleryView: this.props.data.split(',')
    })
  }
  componentDidMount(){
  }
  componentWillReceiveProps(nextProps){
  }
  render() {
    const opt = {
      autoPlay: true,
      callback: function (index) {
        // 更新当前轮播图的index
        if(this.state.galleryView.length == 2){
          if(index == 2){
            index = 0;
          } else if (index == 3){
            index = 1;
          }
        }
        this.setState({index: index});
      }.bind(this)
    }
    return (
      <div className="galleryView">
        <div className="CarouselTip">真机实拍部分为真机样张，您购买的机型大致符合图中成色效果</div>
        <ReactSwipe className="card-slide" swipeOptions={opt}>
          {
             this.state.galleryView.map((item, index) => {
              return (
                <div className="carousel-item" key={index}>
                  <img className="bannerImg" src={item} />
                </div>
              )
            })
          }
        </ReactSwipe>
        <div className="index-container">{this.state.index + 1} / {this.state.galleryView.length}</div>
      </div>
    )
  }
}

export default GalleryView