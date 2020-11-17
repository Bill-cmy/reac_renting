/* eslint-disable import/no-anonymous-default-export */


import { FETCH_CITYLIST, SE_CURRENT_CITYT } from "store/constants"
// 首页的数据   
// 初始值 
const defaultState = {
    cityName: {
        center: { lng: 120.70586918667834, lat: 28.00109529176603 },
        code: 178,
        level: 12,
        name: "广州市"
    },
    // 热门城市
    hotList: [],
    // 后台返回的城市列表数据
    cityList: [],
    // 我们排列好的城市列表数据
    sortedcList: [],
}
// 

export default function (state = defaultState, action) {
    switch (action.type) {
        // 城市列表数据
        case FETCH_CITYLIST: {
            let { hotList, list, cityList } = action;
            return {
                ...state,
                hotList,
                cityList,
                sortedcList: list,

            }
        }
        // 从新设定当前城市名称
        case SE_CURRENT_CITYT: {
            let { cityNames, sortedcList } = action;
            let { cityName } = state
            return {
                ...state,
                cityName: {
                    ...cityName,
                    name: cityNames
                },
                sortedcList: [...sortedcList]

            }
        }
        default: {
            return state;
        }
    }
}