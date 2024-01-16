window.addEventListener('load', function () {

    var big = document.querySelector('.big');
    var img_w = document.querySelector('.img_w');
    var left = document.querySelector('.left');
    var right = document.querySelector('.right');
    var img_wWidth = img_w.offsetWidth;
    var circle = document.querySelector('circle');

    img_w.addEventListener('mouseenter', function () {
        left.style.display = 'block';
        right.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    img_w.addEventListener('mouseleave', function () {
        left.style.display = 'none';
        right.style.display = 'none';
        timer = setInterval(function () {
            //手动调用点击事件
            right.click();
        }, 5000);

    })
    //不用doucument 以此分辨多个ul事件
    var ul = img_w.querySelector('ul');
    var ol = img_w.querySelector('.circle');

    //console.log(ul.children.length);



    for (var i = 0; i < ul.children.length; i++) {

        var li = document.createElement('li');
        ol.appendChild(li);

        //记录当前li的索引号，生成自定义属性
        li.setAttribute('index', i);
        //排他思想
        li.addEventListener('click', function () {
            //清楚所有li current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下自己
            this.className = 'current';

            //点击小圆圈移动图片
            var index = this.getAttribute('index');
            //当点击了li 就要把索引号给num
            num = index;
            //把索引号给circle
            circle = index;
            console.log(img_wWidth);
            console.log(index);

            animate(ul, -index * img_wWidth);
        })
    }
    //设置ol里第一个li类名
    ol.children[0].className = 'current';


    //克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);



    // 点击右侧箭头图片滚动
    var num = 0;
    //控制小圆圈的播放
    var circle = 0;
    //节流阀 flag
    var flag = true;

    right.addEventListener('click', function () {
        //当走到最后一张复制的图片时候，ul要快速复原left改为0
        if (flag) {
            flag = false;// 关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * img_wWidth, function () {
                flag = true;
            });

            circle++;

            if (circle == ol.children.length) {
                circle = 0;
            }
            //调用函数
            circleChange();
        }

    });




    //左侧按钮
    left.addEventListener('click', function () {
        //当走到最后一张复制的图片时候，ul要快速复原left改为0
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * img_wWidth + 'px';

            }
            num--;
            animate(ul, -num * img_wWidth, function () {
                flag = true;
            });

            circle--;
            //若circle < 0说明是第一张图片  小圆圈要改为第四个
            // if(circle < 0){
            //     circle=  ol.children.length -1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;



            //清楚其他类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';

            }
            //留下当前类名
            ol.children[circle].className = 'current';
            circleChange();
        }
    });

    //封装函数
    function circleChange() {
        //清楚其他类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';

        }
        //留下当前类名
        ol.children[circle].className = 'current';
    }

    //自动播放轮播图
    var timer = setInterval(function () {
        //手动调用点击事件
        right.click();
    }, 5000);


})


