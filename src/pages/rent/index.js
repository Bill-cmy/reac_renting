import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile';
import './index.scss';
// import {  API } from 'utils';
import Filter from './component/Filter.js'
// import HouseListItem from 'components/HouseList';
import { connect } from 'react-redux'
import SearchInput from 'components/searchinput/index';
class Index extends Component {
    // 返回上一级
    goBack = () => {
        this.props.history.go(-1)

    }
    // 跳转到城市页面
    toCityList = () => {
        this.props.history.push({ pathname: '/citylist' });
    }
    // 跳转到地图页面
    toMap = () => {
        this.props.history.push('/map')
    }
    // 监听获取数据
 
    render() {
        return (
            <div className='rent-weaper'>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >
                    <SearchInput
                        onCity={this.toCityList}
                        onInput={() => { console.log("输入框"); }}
                        onMap={this.toMap}

                        cityName={this.props.cityName.name}
                    />

                </NavBar>
                <Filter />
                {/* < HouseListItem/> */}

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cityName: state.indexReducer.cityName
    }
}

export default withRouter(connect(mapStateToProps)(Index));