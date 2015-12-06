
/**
    * @collapse-one
    * @desc 生成一个单行收缩组件（包括一个header，和一个 内容content）
    * @param 依赖于 Zepto  
    * @description 点击头部，将内容展开，再次点击时，将内容收起 同时头部有两个span包裹的图标
    * 图标默认显示第一个，大小自定义。
    * 手动给content slidedown时就展开内容
    * @author liangxiaojun
    */

 (function($){

    //只有一行的伸缩collapse
    var collapse_ones = $(".collapse-one");
    //遍历
    collapse_ones.each(function(index, el) {
        var c_header = $(el).find(".collapse-header");
        var c_header_icons = c_header.find(".collapse-header-icon span");
        var c_content = $(el).find(".collapse-content").eq(0);

       if (c_content.hasClass('slidedown')) {
            c_content.show();
           c_header_icons.eq(0).hide().siblings().show();
        }else{
             c_content.hide();
            c_header_icons.eq(1).hide();
        };
       
       // 给头部绑定点击事件
        c_header.on('click',function(){
            if (c_content.hasClass('slidedown')) {
                c_header_icons.eq(1).hide().siblings().show();
                c_content.removeClass('slidedown').hide();
            }else{
                c_header_icons.eq(0).hide().siblings().show();
                c_content.addClass('slidedown').show();
            };
        });
    });
    
})(window.Zepto);



/** demo** 请按照如下格式使用
<div class="collapse-one">
    <div class="collapse-header">
       <!-- 头部文字 自定义区域-->
                    <div class="group-icon-span">
                        <i class="iconfont  icon-pencil"></i>
                        <span class="license">案件备录：</span>
                    </div>
        <!--头部右侧图标，格式不能换-->
        <div class="collapse-header-icon">
            <!-- 两个按钮，点击之后切换 添加dis-no的类 -->
            <span class="span-1"><i class="iconfont icon-arrow-right-circle "></i></span>
            <span class="span-2 "><i class="iconfont icon-arrow-down-circle "></i></span>
        </div>
    </div>
    <!-- 折叠的内容部分  默认折叠，需要默认展开的话添加  slidedown类-->
    <div class="collapse-content">
                    <!-- 点击的时候去掉中间的提示字  自定义区域-->
                    <textarea id="con-text" class="conment-edit"></textarea><!-- 这里是内容部分为强制定义类  -->
                    <div id="holder1" class="holder" >请添加备注信息</div><!-- 但是推荐用ul  li  -->
    </div>
</div>
**/


