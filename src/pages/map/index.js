import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux'
import './index.scss'
import { API } from 'utils';
import HouseList from 'components/HouseList';
import { changeHomeTab } from 'store/actions'
const levelMap = [11, 13, 15]
class Index extends Component {
    // 返回上一页
    goBack = () => {
        this.props.history.go(-1)
    }
    state = {
        showHouseList: false,
        houseList: []
    }
    level = 0;
    async componentDidMount() {
        let { name } = this.props.cityName
        var map = new window.BMap.Map("container");
        // 创建地图实例
        // var point = new window.BMap.Point(116.2787, 40.0492);
        var point = new window.BMap.Point(113.333773, 23.148354);
        // 创建点坐标
        map.centerAndZoom(point, levelMap[this.level]);
        map.setCenter(this.props.cityName.name);
        let mapCityInfo = await API.get(`/area/info?name=${name}`);
        let houList = await API.get(`/area/map?id=${mapCityInfo.value}`);
        // 监听地图移动的房源
        map.addEventListener('movestart', () => {
            if (this.state.showHouseList) {
                this.setState({
                    showHouseList: false,
                    houseList: []
                })
            }
        })
        houList.forEach((v, i) => {
            this.renderCircle(map, v)
        })
        //    渲染圆圈



    }
    renderCircle(instance, item) {
        let that = this
        let { longitude, latitude } = item.coord

        var point = new window.BMap.Point(longitude, latitude);
        var opts = {
            position: point, // 指定文本标注所在的地理位置
            offset: new window.BMap.Size(30, -30) // 设置文本偏移量
        };
        // 创建文本标注对象 
        var labels = new window.BMap.Label("", opts);
        if (this.level === 2) {
            // 小区级别
            labels.setContent(`<div class='rect'><span>${item.label}</span>${item.count}套</div>`);
        } else {
            // 城市行政级别
            labels.setContent(`<div class='cicle'><P>${item.label}</P><P>${item.count}套</P></div>`);
        }
        // 自定义文本标注样式
        labels.setStyle({
            // color: 'red',
            // fontSize: '12px',
            // height: '20px',
            // lineHeight: '20px',
            // fontFamily: '微软雅黑'
            // 去除红点
            cursor: 'pointer',
            border: '0px solid rgb(255,0 ,0)',
            padding: '0px',
            whiteSpace: 'nowrap',
            fontSize: '12px',
            color: 'rgb(255,255,255)',
            textAlign: 'center'

        });
        labels.addEventListener('click', function (e) {
            if (that.level === 2) {
                let target = e.changedTouches[0]
                instance.panBy(window.innerWidth / 2 - target.clientX, (window.innerHeight - 330) / 2 - target.clientY)
                that.handlClickCommunity(instance, item)

            } else {
                that.level = that.level + 1
                instance.setCenter(point);
                instance.setZoom(levelMap[that.level]);
                setTimeout(() => {
                    // 清除地图上所有的遮造物
                    instance.clearOverlays();
                }, 0)
                that.hendleCircleClick(item, instance);
            }


        })
        instance.addOverlay(labels);
    }
    // 点击小区后的处理函数   
    async handlClickCommunity(instance, item) {
        //加载小区的房源
        let data = await API.get(`/houses?cityId=${item.value}`)

        // 拿到加载房源的数据渲染数据 
        console.log(data.list);
        this.setState({
            showHouseList: true,
            houseList: data.list
        });
    }
    async hendleCircleClick(item, instance) {
        // 把地图放大移动到点击位置  
        let houList = await API.get(`/area/map?id=${item.value}`);
        houList.forEach((v, i) => {
            this.renderCircle(instance, v)
        })
    }
    // 跳转更多房源页面
    toMorHouse = () => {
        this.props.dispatch(changeHomeTab('news'))
        this.props.history.push({
            pathname: '/home'
        })
    }
    // 跳转详情页
    toDetaliPage = (item) => {
        console.log(item);
        this.props.history.push({
            pathname: `/detali/${item.houseCode}`
        })

    }
    render() {
        return (
            <div className='mao_Search'>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >城市选择</NavBar> 
                {/* 地图开始 */}
                <div className='map_area' id='container'>
                </div>、
                {/* 地图结束 */}
                {/* 房屋列表home */}
                <div className={['list_area', this.state.showHouseList ? 'show' : ''].join(' ')}>
                    <div className='head'>
                        <span>房源列表</span>
                        <span onClick={this.toMorHouse}>更多</span>
                    </div>
                    <div className='items'>
                        {this.state.houseList.map((v, i) => (
                            <HouseList key={v.houseCode} item={v} onClick={this.toDetaliPage.bind(this, v)} />
                        ))}
                    </div>
                </div>
                {/* 房屋列表emd */}
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cityName: state.indexReducer.cityName,
    }
}
export default connect(mapStateToProps)(Index)