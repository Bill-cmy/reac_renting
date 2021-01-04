import React, { Component } from 'react'
import { API } from 'utils';
import { PickerView } from 'antd-mobile';
import './Filter.scss'
const tabs = [{ label: '区域', index: 'qy', cols: 3, value: "qyValue" },
{ label: '方式', index: 'rentType', cols: 1, value: "rentTypeValue" },
{ label: '租金', index: 'price', cols: 1, value: "priceValue" },
{ label: '筛选', index: 'filter', value: "filterValue" }];


export default class filter extends Component {
    state = {
        currentTab: -1,
        condition: {},
        qy: [],
        rentType: [],
        price: [],
        filter: [],
        qyValue: [],
        rentTypeValue: [],
        priceValue: [],
        filterValue: []
    }
    temp = []
    async componentDidMount() {
        // this.props
        let condition = await API.get(`/houses/condition?id=AREA%7C88cff55c-aaa4-e2e0`)
        let qy = [{ ...condition.area }, { ...condition.subway }]
        let rentType = condition.rentType;
        let price = condition.price;
        let { roomType, oriented, floor, characteristic } = condition
        let filter = [
            { label: "区域", list: [...roomType] },
            { label: "区域", list: [...oriented] },
            { label: "区域", list: [...floor] },
            { label: '朝向', list: [...characteristic] }
        ]
        console.log(condition,
            qy,
            rentType,
            price,
            filter);
        this.setState({
            condition,
            qy,
            rentType,
            price,
            filter

        })
    }
    handleTabClick(index) {
        if (index === this.state.currentTab) {
            index = -1;
        }
        this.temp = []
        this.setState({
            currentTab: index,
        })
    }
    hendValueChange = (val) => {
        this.temp = val
    }
    hendleFCSure = () => {
        let { currentTab } = this.state
        let item = tabs[currentTab]
        if (this.temp.length === 1 && (this.temp[0]) === 'null') {

            this.setState({
                currentTab: -1,
                [item.value]: []
            })

        } else if (this.temp.length) {
            this.setState({
                currentTab: -1,
                [item.value]: this.temp
            })


        } else {
            this.setState({
                currentTab: -1,
            })
        }
    }

    hendleFCC = () => {
        this.setState({
            currentTab: -1,
        })

    }
    hendleClear = () => {
        this.setState({
            filterValue: []
        })
    }
    hendleSure = () => {
        
        
    }
    getConent() {
        if (this.state.currentTab === -1) {
            return null;
        }
        let item = tabs[this.state.currentTab];
        let data = this.state[item.index]
        let { filterValue } = this.state
        if (this.state.currentTab === 3) {
            return (<React.Fragment>
                <div onClick={this.resetTab} className='mask'></div>
                <div className='filte-area'>
                    {data.map((v, i) => (
                        <div className='item' key={i}>
                            <div className='head'>{v.label}</div>
                            <div className='spans'>
                                {v.list.map(p => (
                                    <span className={filterValue.indexOf(p.value) > -1 ? 'active' : ''}
                                        onClick={this.filterSelect.bind(this, p.value)}
                                        key={p.value}>{p.label}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className='opens'>
                        <span onClick={this.hendleClear}>清除</span>
                        <span onClick={this.hendleSure}>確定</span>
                    </div>
                </div>
            </React.Fragment>);
        }
        if ([0, 1, 2].indexOf(this.state.currentTab) > -1) {

            return (
                <div className='filter-content'>
                    <PickerView

                        data={data}
                        cols={item.cols}
                        value={this.state[item.value]}
                        onChange={this.hendValueChange}
                    />
                    <div className='opens'>
                        <span onClick={this.hendleFCC}>清除</span>
                        <span onClick={this.hendleFCSure}>確定</span>
                    </div>
                </div>
            )
        }
    }
    resetTab = () => {
        this.setState({
            currentTab: -1
        })
        console.log(6666);
    }
    filterSelect(value) {
        let { filterValue } = this.state
        let index = filterValue.indexOf(value)

        if (index > -1) {
            filterValue.splice(index, 1)
            console.log(8);
        } else {
            filterValue.push(value)
            console.log(9);
        }
        this.setState({
            filterValue
        })
    }
    getmask() {
        return [0, 1, 2].indexOf(this.state.currentTab) > -1 ?
            <div onClick={this.resetTab} className='mask'>
            </div> : null;
    }
    isActive = (index) => {
        let item = tabs[index];
        let data = this.state[item.value]
        if (this.state.currentTab === index) {
            return true
        } else if (data.length > 0) {
            return true
        }
        return false;
    }
    render() {
        return (

            <div className='cop-filter-weaper'>
                {this.getmask()}
                <div className='head'>
                    {tabs.map((v, i) =>
                        <span
                            className={this.isActive(i) ? 'active' : ''}
                            onClick={this.handleTabClick.bind(this, i)}
                            key={i}>{v.label}
                            <i className='iconfont icon-arrow'></i>
                        </span>)}
                </div>
                {/* 过滤区域 */}
                { this.getConent()}
            </div >
        )
    }
}
