import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux'
import './index.scss'
class Index extends Component {
    // 返回上一页
    goBack = () => {
        this.props.history.go(-1)
    }
    componentDidMount() {

        var map = new window.BMap.Map("container");
        // 创建地图实例
        var point = new window.BMap.Point(116.404, 39.915);
        // 创建点坐标
        map.centerAndZoom(point, 11);
        console.log(this.props.cityName, 'this.props.cityName');
        map.setCenter(this.props.cityName.name);
    }
    render() {
        return (
            <div className='mao_Search'>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >城市选择</NavBar>
                <div className='map_area' id='container'>
                </div>
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