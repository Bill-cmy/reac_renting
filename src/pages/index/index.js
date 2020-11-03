import React, { Component } from 'react'
import { Carousel, div } from 'antd-mobile';
import Axios from 'axios';
export default class componentName extends Component {
    state = {
        swiperList: [],
        imgHeight: 176,
    }
    async componentDidMount() {
        // simulate img loading
        let swiperRes = await Axios.get('http://localhost:8080/home/swiper')
        console.log(swiperRes);
        this.setState({

            swiperList: swiperRes.data.body
        })

    };

    render() {
        return (
            <div>
                <Carousel
                    autoplay={true}
                    infinite='true'
                >
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
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
            </div>
        );
    }
}
