/**
* @file form.js factories for creating form ui components
* @author zhaowei
*/
(function ($) {
    var exports,    // 将要拓展到APP命名空间的容器
        Select,     // 下拉列表构造器
        CheckBox,   // 复选框构造器
        Switch;     // 开关构造器
    
    Select = function (domId, options, width, defaultValue) {
        /**
        * @factory Select
        * @desc 生成一个下拉框
        * @param dom {String} Zepto dom selector
        * @param options {Object} value & text pairs, e.g. {true: "是", false: "否"}
        * @param width {String} width css value, e.g. 10rem; default 8rem
        * @usage 
        *       HTML:<div id="selectDemo" class="form-select"></div>
        *       JS:var selectDemo = new APP.Select('selectDemo', {1:选项1,2:选项2,3:选项3}, '10rem')
        */
        var select, setOption;
        
        width = width || "";
        
        // 构造下拉框并加入到dom
        var wrapper, select, html = "";
        wrapper = $("#" + domId);
        
        // assemble html
        html += '<select' + ' style="width: 100%">';
        $.each(options, function (value, text) {
            html += ('<option value="' + value + '">' + text + '</option>');
        });
        html += '</select><button class="arrow-select"><i class="iconfont icon-triangle-down"></i></button>';
        
        wrapper.addClass('clearfix');
        wrapper.css('width', width);
        wrapper.append(html);
        
        select = wrapper.children()[0];
        
        setOption = function (value) {
            // @param optionId, index for options, starts at 0
            select.querySelector('option[value="'+ value +'"]').setAttribute("selected", true);
            //$(select.options[optionId]).attr("selected", true);
        };
        
        if (defaultValue !== undefined) {
            setOption(defaultValue);
        }
        
        return {
            wrapper: wrapper,
            getValue: function () {
                return select.value;
            },
            setOption: setOption
        };
    };
    
    CheckBox = function (domId, defaultValue) {
        /**
        * @param defaultValue {Boolean} true/false, default false
        * @usage
        *       HTML: <div id="checkboxId" class="form-checkbox"></div>
        *       JS: var checkboxId = new APP.CheckBox("checkboxId");
        */
        // 构造下拉框并加入到dom
        var wrapper, input, html = "";
        wrapper = $("#" + domId);
        
        // assemble html
        html += '<input type="checkbox">';
        
        wrapper.append(html);
        
        // bind event
        wrapper.on('click', function () {
            wrapper.toggleClass("checked");
        });
        
        input = wrapper.children()[0];
        
        if (defaultValue) {
            wrapper.addClass("checked");
            input.checked = true;
        }
        
        return {// 实例包含的属性（方法）
            wrapper: wrapper,// 该组件的Zepto对象引用（活引用）
            getValue: function () {
                return input.checked;
            },
            setValue: function (value) {
                if (value) {
                    wrapper.addClass("checked");
                    input.checked = true;                    
                } else {
                    wrapper.removeClass("checked");
                    input.checked = false;                    
                }
            }
        };
    };
    
    Switch = function (domId, defaultValue) {
        /**
        * @param defaultValue {Boolean} true/false, default false
        * @usage
        *       HTML: <div id="checkboxId" class="form-switch"></div>
        *       JS: var checkboxId = new APP.Switch("checkboxId");
        */        
        var wrapper, button, input, html = "";
        wrapper = $("#" + domId);
        
        html += '<input class="" type="checkbox"><div class="switch"><div class="switch-button"></div></div>';
        wrapper.append(html);
        
        button = $($(wrapper.children()[1]).children()[0]);
        input = wrapper.children()[0];
        
        wrapper.on('click', function () {
            button.toggleClass("switch-button-on");
        });
        
        if (defaultValue) {
            button.addClass("switch-button-on");
            input.checked = true;
        }
        
        return { // 实例包含的属性（方法）
            wrapper: wrapper, // 该组件的Zepto对象引用（活引用）
            getValue: function () {
                return input.checked;
            },
            setValue: function (value) {
                if (value) {
                    button.addClass("switch-button-on");
                    input.checked = true;
                } else {
                    button.removeClass("switch-button-on");
                    input.checked = false;
                }
            }
        };
    };
    
    exports = {Select: Select, CheckBox: CheckBox, Switch: Switch};
    
    // 将exports中的方法拓展到APP命名空间
    $.extend(APP, exports);
})(window.Zepto);