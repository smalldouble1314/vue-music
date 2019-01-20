//封装jsonp,是常出现的参数,定义在config中
export const commonParams = {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
}
export const options = {
    param: 'jsonpCallback'
}
export const ERR_OK = 0