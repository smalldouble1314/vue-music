import originJSONP from 'jsonp'
const param = (data) => {
    let url = ''
    for (let k in data) {
        // 判断传输过来的数据是否为空
        let value = data[k] !== undefined ? data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}

export default (url, data, option) => {
    // 将URL进行拼接,并且判断当前URL中有没有?如果没有?就添加一个?如果有就添加一个&
    url += (url.indexOf("?") < 0 ? '?' : '&') + param(data)
    return new Promise((resolve, reject) => {
        originJSONP(url, option, (err, data) => {
            if (!err) resolve(data)
            else reject(err)
        })
    })
}