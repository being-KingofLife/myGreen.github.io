//动画函数封装 obj对象 target位置
function animate(obj, target, callback) {

    // var timer -> obj.timer  优化写法
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        //步长数改成整数，避免小数出现
        //写可以退后效果
        //var step =Math.ceil((target - obj.offsetLeft))/10;
        var step = (target - obj.offsetLeft) / 10;
        //ceil向上取整 floor向下取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //var step =Math.ceil((target - obj.offsetLeft)/10);

        if (obj.offsetLeft == target) {
            //停止动画本质是停止定时器
            clearInterval(obj.timer);

            //回调函数的使用
            if (callback) {
                callback();
            }
            callback && callback();
        }
        else {
            // 改成慢慢变小的值，（目标值-现在的位置）/10 
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 15);
}