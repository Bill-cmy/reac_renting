
import { TabBar } from 'antd-mobile';
import React, { Component } from 'react'
import Idenx from './pages/index'
import My from './pages/my'
import News from './pages/news'
import Rent from './pages/rent/idnex'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'index',
      hidden: false,


    };
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>

      </div>
    );
  }

  render() {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : {
        height: 667
      }}>
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
            selected={this.state.selectedTab === 'blueTab'}

            onPress={() => {
              this.setState({
                selectedTab: 'index',
              });
            }}

          >
            <Idenx />
          </TabBar.Item>

          <TabBar.Item

            icon={<i className="iconfont icon-seach"></i>}
            selectedIcon={<i className="iconfont icon-seach"></i>}
            title="找房"
            key="rent"
            selected={this.state.selectedTab === 'rent'}
            onPress={() => {
              this.setState({
                selectedTab: 'rent',
              });
            }}

          >
            <Rent />
          </TabBar.Item>

          <TabBar.Item

            icon={<i className="iconfont icon-infom"></i>}
            selectedIcon={<i className="iconfont icon-infom"></i>}

            title="资讯"
            key="news"

            selected={this.state.selectedTab === 'news'}
            onPress={() => {
              this.setState({
                selectedTab: 'news',
              });
            }}
          >
            <News />
          </TabBar.Item>

          <TabBar.Item
            icon={<i className="iconfont icon-myinfo"></i>}
            selectedIcon={<i className="iconfont icon-myinfo"></i>}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'my'}
            onPress={() => {
              this.setState({
                selectedTab: 'my',
              });
            }}
          >
            <My />
          </TabBar.Item>
        </TabBar>
      </div >
    );
  }
}
