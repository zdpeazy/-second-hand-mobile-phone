import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './select_area.less';
import { allAreaInfo } from './area';
import * as util from '../../util';

const HEIGHT = 30;
export class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.index,
      hasDefault: this.props.hasDefaultArea
    };
    this.onScroll = this.onScroll.bind(this);
    this.resetPosition = this.resetPosition.bind(this);
  }

  componentDidMount() {
    console.log(this.state.selectedIndex);
    this.refs.scroller.scrollTop = this.state.selectedIndex * HEIGHT;
    this.refs.scroller.addEventListener('touchstart', this.touchStart, false);
    this.refs.scroller.addEventListener('touchend', this.touchEnd, false);
    this.refs.scroller.addEventListener('mousedown', this.touchStart, false);
    this.refs.scroller.addEventListener('mouseup', this.touchEnd, false);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.type, nextProps.index);
    // if (!this.isTouchStart) {
      this.refs.scroller.scrollTop = nextProps.index * HEIGHT;
    // }
  }

  componentWillUnmount(){
    clearTimeout(this.timer);
  }

  touchStart() {
    console.log('touchStart')
    this.isTouchStart = true;
  }

  touchEnd() {
    console.log('touchEnd')
    this.isTouchStart = false;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(this.resetPosition, 50);
  }

  onScroll() {
    console.log('onScroll')
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(this.resetPosition, 50);
  }

  resetPosition() {
    let provinceList = [], cityList = [], districtList = [];
    const { type = '', allAreaInfo = [], callback = () => { } } = this.props;
    if (this.isTouchStart) return;
    const top = this.refs.scroller.scrollTop;
    const distance = top % HEIGHT;
    let target;
    if (distance > HEIGHT / 2) {
      target = top + HEIGHT - distance;
      this.refs.scroller.scrollTop = target;
    } else {
      target = top - distance;
      this.refs.scroller.scrollTop = target;
    }
    const selectedIndex = target / HEIGHT;
    console.log(selectedIndex)
    this.setState({
      selectedIndex
    }, () => {
      callback(type, selectedIndex);
    });
  }

  render() {
    const { list = [] } = this.props;
    return (
      <div className="ul-area" onScroll={this.onScroll} ref="scroller">
        <ul>
          <li></li>
          <li></li>
          {
            list.map((item, index) => (
              <li key={index} className={`${index === this.state.selectedIndex && 'selected'}`}>{item}</li>
            ))
          }
          <li></li>
          <li></li>
        </ul>
      </div>
    )
  }
}

export class SelectArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceList: [],
      cityList: [],
      districtList: [],
      provinceIndex: 0,
      cityIndex: 0,
      districtIndex: 0,
      province: '',
      city: '',
      district: '',
      showPicker: false,
      hasDefaultArea: this.props.province
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  componentDidMount() {
    allAreaInfo.unshift({
      'name': '请选择',
      'city': []
    })
    allAreaInfo.forEach(item => {
      item.city.unshift({
        'name': '请选择',
        'area': []
      })
      item.city.forEach(city => {
        city.area.unshift('请选择')
      })
    })
    const { province = '', city = '', district = '' } = this.props;
    let provinceList = [], cityList = [], districtList = [], provinceIndex = 0, cityIndex = 0, districtIndex = 0;
    if (province) {
      console.log(province)
      provinceIndex = allAreaInfo.findIndex(item => item.name === province);
      cityIndex = allAreaInfo[provinceIndex].city.findIndex(item => item.name === (city || '其他'));
      districtIndex = allAreaInfo[provinceIndex].city[cityIndex].area.findIndex(item => item === (district || '其他'));
      console.log(provinceIndex)
      this.setState({
        provinceIndex,
        cityIndex,
        districtIndex,
        showPicker: true
      });
    }
    this.setState({
      provinceList: this.getList('province'),
      cityList: this.getList('city', provinceIndex),
      districtList: this.getList('district', provinceIndex, cityIndex),
      showPicker: true
    });
  }
  componentWillUnmount(){
    allAreaInfo.shift();
    allAreaInfo.forEach(item => {
      item.city.shift()
      item.city.forEach(city => {
        city.area.shift()
      })
    })
  }

  handleSelect(type, index) {
    let provinceList = [], cityList = [], districtList = [];
    const { provinceIndex, cityIndex, districtIndex, hasDefaultArea } = this.state;
    switch(type) {
      case 'province':
        this.setState({
          // hasDefaultArea: false,
          provinceIndex: index,
          cityIndex: hasDefaultArea ? cityIndex : 0,
          districtIndex: hasDefaultArea ? districtIndex : 0,
          province: this.getName('province', index),
          city: this.getName('city', index, 0),
          district: this.getName('district', index, 0, 0),
          cityList: this.getList('city', index),
          // districtList: this.getList('district', index, 0)
        });
        break;
      case 'city':
        this.setState({
          // hasDefaultArea: false,
          cityIndex: index,
          districtIndex: hasDefaultArea ? districtIndex : 0,
          city: this.getName('city', provinceIndex, index),
          district: this.getName('district', provinceIndex, index, 0),
          districtList: this.getList('district', provinceIndex, index)
        });
        break;
      case 'district':
        this.setState({
          districtIndex: index,
          district: this.getName('district', provinceIndex, cityIndex, index),
          hasDefaultArea: false
        });
        break;
      default:
        break;
    }
  }

  getList(type, provinceIndex, cityIndex, districtIndex) {
    let list = []
    switch (type) {
      case 'province':
        allAreaInfo.forEach(item => list.push(item.name))
        break
      case 'city':
        allAreaInfo[provinceIndex].city.forEach(item => list.push(item.name))
        break
      case 'district':
        list = allAreaInfo[provinceIndex].city[cityIndex].area
        break
    }
    return list
  }

  getName(type, provinceIndex, cityIndex, districtIndex) {
    let name = ''
    switch (type) {
      case 'province':
        name = allAreaInfo[provinceIndex].name
        break
      case 'city':
        name = allAreaInfo[provinceIndex].city[cityIndex].name
        break
      case 'district':
        name = allAreaInfo[provinceIndex].city[cityIndex].area[districtIndex]
        break
    }
    return name === '请选择' ? '' : name;
  }

  confirm() {
    const { province, city, district } = this.state;
    if (!province || !city || !district) return util.toast('请选择完整所在地区~');
    console.log(province, city, district);
    this.props.getAreaFn({
      province, city, district
    });
    this.props.hidePickerFn(false);
  }
  cancel(){
    this.props.hidePickerFn(false);
  }

  render() {
    const { cancel = () => {}, confirm = () => {} } = this.props;
    const { provinceList, cityList, districtList, provinceIndex, cityIndex, districtIndex, hasDefaultArea } = this.state;
    return (
      <div id="select-area" className={`${this.state.showPicker ? 'selectAreaBoxShow' : 'selectAreaBoxHide'}`}>
        <div className="select-area" onClick={e => e.stopPropagation()}>
          <div className="select row border-bottom-grey">
            <div className="emptyBox"></div>
            <div className="confirm"
            onClick={this.confirm.bind(this)}>确定</div>
            <div className="cancel" onClick={this.cancel.bind(this)}>取消</div>
          </div>
          <div className="row list">
            <Picker type="province" hasDefaultArea={hasDefaultArea} list={provinceList}
            index={this.state.provinceIndex} callback={this.handleSelect} />
            <Picker type="city" hasDefaultArea={hasDefaultArea} list={cityList}
            index={cityIndex} callback={this.handleSelect} />
            <Picker type="district" hasDefaultArea={hasDefaultArea} list={districtList}
            index={districtIndex} callback={this.handleSelect} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => (state))(SelectArea);
