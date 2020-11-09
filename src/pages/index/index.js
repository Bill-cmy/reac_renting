/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { Carousel, div } from 'antd-mobile';
import Axios from 'axios';
import './index.scss'
import img1 from 'assets/images/nav-1.png'
import img2 from 'assets/images/nav-2.png'
import img3 from 'assets/images/nav-3.png'
import img4 from 'assets/images/nav-4.png'
import SearchInput from 'components/searchinput/index';
console.log(img1, img2, img3, img4);
const img = [{ img: img1, title: '整租' }, { img: img2, title: '合租' },
{ img: img3, title: '地图找房' }, { img: img4, title: '去出租 ' }]

export default class componentName extends Component {
    state = {
        swiperList: [],
        imgHeight: 176,
        groupsList: []
    }
    async componentDidMount() {
        let swiperRes = await Axios.get('http://localhost:8080/home/swiper')
        let groupsList = await Axios.get('http://localhost:8080/home/groups?area=AREA%7C88cff55c-aaa4-e2e0')


        this.setState({

            swiperList: swiperRes.data.body,
            groupsList: groupsList.data.body

        })

    };

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
                            onCity={() => { console.log("城市"); }}
                            onInput={() => { console.log("输入框"); }}
                            onMap={() => { console.log("地图") }}
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
                                    <img src={`http://localhost:8080${v.imgSrc}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* 租房小组end */}
            </div >
        );
    }

}
