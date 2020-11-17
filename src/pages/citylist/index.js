import React, { Component } from 'react';
import './index.scss';
import { connect } from 'react-redux'
// 进入actions
import { fetchCityList, setCurrentCity } from 'store/actions'
// 引入强大的列表组件
import { List, AutoSizer } from 'react-virtualized';
import { NavBar, Icon } from 'antd-mobile';
class Index extends Component {
    state = {
        hotLit: [],
        cityList: [],
        list: [],
        startIndex: 0
    }
    // 非受控表单
    constructor() {
        super();
        this.listRef = React.createRef();
    }
    // 返回上一页
    goBack = () => {
        this.props.history.go(-1)
    }
    async componentDidMount() {
        console.log(5555);
        if (this.props.sortedcList.length === 0) {
            // 发异步的action
            this.props.dispatch(fetchCityList());
        }
    }
    // 给列表一个方法
    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        let item = this.props.sortedcList[index];
        let keys = Object.keys(item);
        let mark = keys[0];
        let arr = item[mark];
        return (
            <div key={key} style={style} className="list-item">
                {/* {list[index]} */}
                <div className='title'>{mark}</div>
                {arr.map((v, i) => <div key={i} className='item' onClick={this.setCurrentCity.bind(this, v)}>{v}</div>)}
            </div>
        );
    }
    // 点击事件，重新设置当前城市改变
    setCurrentCity = (cityNames) => {
        console.log(cityNames, this.props, '222222222');
        this.props.dispatch(setCurrentCity(cityNames))
        this.props.history.push('/home')
    }
    // 动态获取每行的高度
    getHeight = ({ index }) => {
        let item = this.props.sortedcList[index];
        let keys = Object.keys(item);
        let mark = keys[0];
        let arr = item[mark];
        return 50 + arr.length * 50;
    }
    // 右面列表渲染
    getRightRender = () => {
        let { startIndex } = this.state

        return (
            <React.Fragment>
                {this.props.sortedcList.map((v, i) => {
                    let keys = Object.keys(v);
                    let mark = keys[0];
                    let mk = mark[0];
                    return (<span onClick={this.toIndex.bind(this, i)}
                        className={startIndex === i ? 'active' : ''}
                        key={i}>{mk === '当' ? '#' : mk}</span>)
                })}
            </React.Fragment>
        )
    }
    // 监听行的元素
    rowsRendered = ({ startIndex, stopIndex }) => {
        this.setState({
            startIndex
        })
    }
    // 点击右侧事件
    toIndex(index) {
        this.listRef.current.scrollToRow(index)

    }
    render() {
        return (
            <div className='city_tap'>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >城市选择</NavBar>
                {/* 列表组件开始 */}
                <div className='list-area'>
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                width={width}
                                height={height}
                                rowHeight={this.getHeight}
                                rowCount={this.props.sortedcList.length}
                                rowRenderer={this.rowRenderer}
                                onRowsRendered={this.rowsRendered}
                                scrollToAlignment="center"
                                ref={this.listRef}
                            />
                        )}
                    </AutoSizer>
                    {/* l列表右面开始 */}
                    <div className='list_right'>
                        {this.getRightRender()}
                    </div>
                    {/* 列表右面结束 */}
                    {/* 列表组件结束 */}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cityName: state.indexReducer.cityName,
        hotLit: state.indexReducer.hotLit,
        cityList: state.indexReducer.cityList,
        sortedcList: state.indexReducer.sortedcList

    }
}
export default connect(mapStateToProps)(Index);