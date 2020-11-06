import React, { Component } from 'react'
import './index.scss';

export default class index extends Component {
    render() {
        return (
            < div className='search'>
                
                {/*搜素框左边home */} 
                <div className="seach_left">
                    <div className="city">
                        <span>上海</span>
                        <i className="iconfont icon-arrow"></i>
                    </div>
                    <div className='input'>
                        <i className="iconfont icon-seach"></i>
                        <span className='woe'>请输入地址</span>

                    </div>
                </div>
                {/* 搜索右边 */}
                <div className='seach_right'>
                    <i className="iconfont icon-map"></i>
                </div>

            </ div>
        )
    }
}
