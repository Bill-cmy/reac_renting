import React, { Component } from 'react'
import './index.scss';

export default class index extends Component {

    hendCity = () => {
        this.props.onCity();
    }
    hendIput = () => {
        this.props.onInput()
    }
    hendMap = () => {
        this.props.onMap()
    }
    render() {
        return (
            < div className='search'>

                {/*搜素框左边home */}
                <div className="seach_left">
                    <div className="city">
                        <span onClick={this.hendCity}>上海</span>
                        <i className="iconfont icon-arrow"></i>
                    </div>
                    <div className='input' onClick={this.hendIput}>
                        <i className="iconfont icon-seach"></i>
                        <span className='woe'>请输入地址</span>

                    </div>
                </div>
                {/* 搜索右边 */}
                <div className='seach_right' onClick={this.hendMap}>
                    <i className="iconfont icon-map"></i>
                </div>
                
            </ div>
        )
    }
}
