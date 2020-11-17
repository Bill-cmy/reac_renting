import { API } from "utils"
import { FETCH_CITYLIST, SE_CURRENT_CITYT } from "store/constants"
// 获取城市列表
export const fetchCityList = () => {

    return async (dispatch, getState) => {
        let hotList = await API.get('/area/hot');
        let cityList = await API.get('/area/city?level=1')
        let { cityName } = getState().indexReducer;
        let list = [
            { "当前定位": [cityName.name.slice(0, 2)] },
            { '热门城市': hotList.map((v) => v.label) }
        ]
        // sort给数组排列顺序
        cityList.sort((a, b) => {
            return a['short'] > b['short'] ? 1 : -1


        });

        // 给数组排序字母
        cityList.forEach((v, i, a) => {
            // 数组的长度
            let len = list[list.length - 1]

            // 当前值的排序顺序当前的数组的值
            let keys = Object.keys(len)
            // 当前值的排序顺序day出来
            let key = keys[0]
            // 当前值v
            let short = v['short'];
            // 给当前索引值的第一个字符改成大写
            let mark = short[0].toUpperCase();
            if (key === mark) {
                len[key].push(v.label)
            }
            else {
                let obj = {
                    [mark]: [v.label]
                }
                list.push(obj)
            }

        })
        dispatch({
            type: FETCH_CITYLIST,
            hotList,
            cityList,
            list
        })
    }
}
export const setCurrentCity = (cityNames) => {
    return (dispatch, getstate) => {
        let { sortedcList } = getstate().indexReducer;
        sortedcList[0]["当前定位"][0] = cityNames.slice(0, 2)

        dispatch({
            type: SE_CURRENT_CITYT,
            cityNames,
            sortedcList
        })
    }
}