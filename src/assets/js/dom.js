export const addClass = (el, className) => {
    //如果已经拥有传入的类名,直接return不执行下面的代码
    if (hasClas(el, className)) return;
    // 如果没有就使用el.className添加传入的类名
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

//判断是否拥有calssName的类名
export const hasClas = (el, className) => {  
    //使用正则表达式 来验证是否具有className类名
    let reg = new RegExp('(^/\\s)' + className + '(\\s/$)')
    //判断是否具有el.className是否具有和传入的类名一样的类名
    return reg.test(el.className)
}