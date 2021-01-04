/* eslint-disable no-undef */

import { TabBar } from 'antd-mobile';
import React, { Component } from 'react'
import Index from 'pages/index'
import My from 'pages/my'
import News from 'pages/news'
import Rent from 'pages/rent/index'
import { connect } from 'react-redux'
import { changeHomeTab } from 'store/actions'
class Home extends Component {

    render() {
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    tabBarPosition="bottom"

                >

                    <TabBar.Item
                        title="首页"
                        key="index"

                        icon={<i className="iconfont icon-ind"></i>}
                        selectedIcon={<i className="iconfont icon-ind"></i>}
                        selected={this.props.selectedTab === 'blueTab'}
                        onPress={() => { this.props.dispatch(changeHomeTab('index')) }}

                    >
                        <Index />
                    </TabBar.Item>
                    <TabBar.Item

                        icon={<i className="iconfont icon-infom"></i>}
                        selectedIcon={<i className="iconfont icon-infom"></i>}

                        title="找房"
                        key="rent"

                        selected={this.props.selectedTab === 'rent'}
                        onPress={() => { this.props.dispatch(changeHomeTab('rent')) }}
                    >
                        <Rent />
                    </TabBar.Item>

                    <TabBar.Item

                        icon={<i className="iconfont icon-seach"></i>}
                        selectedIcon={<i className="iconfont icon-seach"></i>}
                        title="资讯"
                        key="news"
                        selected={this.props.selectedTab === 'news'}
                        onPress={() => { this.props.dispatch(changeHomeTab('news')) }}

                    >
                        <News />
                    </TabBar.Item>



                    <TabBar.Item
                        icon={<i className="iconfont icon-myinfo"></i>}
                        selectedIcon={<i className="iconfont icon-myinfo"></i>}
                        title="我的"
                        key="my"
                        selected={this.props.selectedTab === 'my'}
                        onPress={() => { this.props.dispatch(changeHomeTab('my')) }}
                    >
                        <My />
                    </TabBar.Item>
                </TabBar>
            </div >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        selectedTab: state.indexReducer.selectedTab
    }
}
export default connect(mapStateToProps)(Home);