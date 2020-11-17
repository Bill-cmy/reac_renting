/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Carousel } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import './index.scss'

import { BASE_URL, API } from 'utils';
import img1 from 'assets/images/nav-1.png'
import img2 from 'assets/images/nav-2.png'
import img3 from 'assets/images/nav-3.png'
import img4 from 'assets/images/nav-4.png'
import SearchInput from 'components/searchinput/index';

const img = [{ img: img1, title: '整租' }, { img: img2, title: '合租' },
{ img: img3, title: '地图找房' }, { img: img4, title: '去出租 ' }]

// console.log(BASE_URL, "ssss", process.env);
class Index extends React.PureComponent {
    state = {
        swiperList: [],
        imgHeight: 176,
        groupsList: [],
        newList: []
    }
    // 监听事件
    async componentDidMount() {

        let swiperList = await API.get(`/home/swiper`)
        let groupsList = await API.get(`/home/groups?area=AREA%7C88cff55c-aaa4-e2e0`);
        let newList = await API.get(`/home/news?area=AREA%7C88cff55c-aaa4-e2e0`);
        this.setState({
            swiperList,
            groupsList,
            newList,

        })

    };

    getCurrentCity() {
        // 拿到当前城市的名称
        var myCity = new window.BMap.LocalCity();
        return new Promise(function (resove, reject) {
            try {
                myCity.get((result) => {
                    resove(result);
                })
            } catch (e) {
                reject(e);
            }
        })
    }
    // 跳转到城市页面
    toCityList = () => {
        this.props.history.push({ pathname: '/citylist' });
    }
    // 跳转到地图页面
    toMap = () => {
        this.props.history.push('/map')
    }
    render() {
        return (
            <div className='index'>
                <div className='in_swiper'>
                    {this.state.swiperList.length ? <Carousel
                        autoplay={true}
                        infinite
                        autoplayInterval={1000}
                        speed={200}
                    >
                        {/* 轮播图home */}
                        {this.state.swiperList.map(val => (
                            <a
                                key={val.id}
                                href="http://www.alipay.com"
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                                <img
                                    src={`http://localhost:8080${val.imgSrc}`}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                        ))}
                        {/* 轮播图end */}

                    </Carousel> : null}
                    {/* 搜索框home */}
                    <div className='search'>
                        <SearchInput
                            onCity={this.toCityList}
                            onInput={() => { console.log("输入框"); }}
                            onMap={this.toMap}

                            cityName={this.props.cityName.name}
                        />
                    </div>
                    {/* 搜索框end */}
                </div>

                {/* 导航home */}
                <div className='in_nav'>
                    {img.map((v, i) => (
                        <div key={i} className="nav_img">
                            <div className='img'>
                                <img src={v.img} />
                            </div>
                            <span>{v.title}</span>
                        </div>
                    ))}
                </div>
                {/* 导航end */}
                {/* 租房小组home */}
                <div className="index_squad">
                    <div className="squad_tab">
                        <span>租房小组</span>
                        <span>更多</span>
                    </div>
                    <div className="squad_list">
                        {this.state.groupsList.map((v, i) => (
                            <div className="list" key={v.id}>
                                <div className="left">
                                    <span>{v.title}</span>
                                    <span>{v.desc}</span>
                                </div>
                                <div className="right">
                                    <img src={`${BASE_URL}${v.imgSrc}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* 租房小组end */}
                {/* 最新资讯home */}
                <div className='index_new'>
                    <div className='new_tetle'>最新资讯 </div>
                    <div className='list_resource'>
                        {this.state.newList.map((v, i) => (

                            <div className='item' key={v.id}>
                                <div className='left'>
                                    <img src={`${BASE_URL}${v.imgSrc}`} />
                                </div>
                                <div className='right'>
                                    <div>{v.title}</div>
                                    <div className='bottom'>
                                        <span>{v.from}</span>
                                        <span>{v.date}</span>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
                {/* 最新资讯end */}
            </div >
        );
    }

}
const mapStateToProps = (state) => {
    return {
        cityName: state.indexReducer.cityName
    }
}
// 为了让组件，拿到hashtory对象 使用这种组件包裹的方式
export default withRouter(connect(mapStateToProps)(Index));