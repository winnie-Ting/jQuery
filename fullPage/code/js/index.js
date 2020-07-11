$(function () {
    /*初始化fullpage组件*/
    /*1.设置每一个屏幕的背景颜色*/
    /*2.设置屏幕内容的对齐方式  默认是垂直居中的  改成顶部对齐*/
    /*3.设置导航 设置指示器 点容器*/
    /*4.监听进入某一屏的时候 回调*/
    $('#container').fullpage({
        /*配置参数*/
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        verticalCentered: false,
        navigation: true,
        // afterLoad:滚动到某一屏后的回调函数
        afterLoad:function (link,index) {
            /*index 序号 1开始  当前屏的序号*/
            $('.section').eq(index-1).addClass("ani");

        },
         //onLeave 离开某一个页面的时候开始做动画
         onLeave:function(index,nextIndex,down){
            // if(index==2&&nextIndex==3){
            //     // 当前是从第二页到第三页
            //     $('.section').eq(index-1).addClass('leaved');
            // }if(index==3&&nextIndex==4){
            //     $('.section').eq(index-1).addClass('leaved');
            // }
            $('.section').eq(index-1).addClass('leaved');
        },

        // 点击next-page切换下一页
        // afterRender:页面结构生成后的回调函数，或者说页面初始化完成后的回调函数
        afterRender:function(){
            //jquery插件的封装方法
            // jquery本身没有的方法，通过 $.fn.fullpage=function(){}追加，可认为是插件封装；
            /**例如：
             * $.fn.src=function(){ return this.attr('src')} 
             * this--jquery 对象
             */
            $(".next-page").on("click",function(){
                $.fn.fullpage.moveSectionDown();
            });
            /*当第四屏的购物车动画结束之后执行收货地址的动画*/
            $('.section4 .car').on('transitionend',function(){
                // :last :first :visible :hidden :checked :selected jQuery扩展选择器
                $('.section4 .address').show().find('img:last').fadeIn(1000);
                $('.section4 .text').addClass('show');
            });
        },
        /**控制页面的滚动时间 */
        scrollingSpeed: 1000
    });
})