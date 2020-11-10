import React, { Component } from 'react'

import { NavBar, Icon } from 'antd-mobile';
export default class citylist extends Component {
    render() {
        return (
            <div><NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
            >城市选择</NavBar>
            </div>
        )
    }
}
