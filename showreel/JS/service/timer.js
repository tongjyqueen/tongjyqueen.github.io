/**
* @file  timer.js  定时器
* @author zhaowei
*/
(function ($) {
  var timer = {};
  timer.countDown = function(initial, step, wrapper, format) {
    /**
    * @method   countDown
    * @param    initial   (Int)     seconds for counting down
    * @param    step      (Int)     seconds for duration of counting
    * @param    wrapper   (Object HTMLElement)  the time wrapper HTMLElement
    * @param    format    (Int)     Enum  {1, 2, 3} 1 for x时x分x秒, 2 for xx:xx:xx, 3 for xxx秒
    * @usage    HTML: <span id="countdown"></span> JS: var wrapper = document.querySelector('#countdown'); time.countDown(2434, 1, wrapper, 1)
    * @event    a 'timeover' event will be dispatched while the countdown ends up
    */
    
    if (wrapper == null||wrapper == []) {
        return;
    }
      
    var start,
        MS_IN_SEC = 1000,
        SEC_IN_MIN = 60,
        SEC_IN_HOUR = 3600,
        MIN_IN_HOUR = 60;
    
    //var timeOverEvt = new Event('timeover', {"bubbles":true, "cancelable":false});
    var timeOverEvt = $.Event('timeover', {"bubbles":true, "cancelable":false});
      
    start = new Date().getTime();

    function renderCounter () {
      var current, remain, remainHours, remainMinutes, remainSeconds, passed, remainStr;
      // calculate remaining time
      if (!wrapper && counter) {
        clearInterval(counter);
        return;
      }
      current = new Date().getTime();
      passed = (current - start) / MS_IN_SEC;
      remain = parseInt(initial - passed);
      remainStr = '';
      
      remainHours = Math.floor(remain / SEC_IN_HOUR);
      remainMinutes = Math.floor((remain % SEC_IN_HOUR) / SEC_IN_MIN);
      remainSeconds = remain % SEC_IN_MIN;
    
      // check counting over
      if (remain > 0) {

        // formating
        switch (format) {
          case 1:
            remainStr += remainHours ? (remainHours + '时') : '';
            remainStr += remainMinutes ? (remainMinutes + '分') : '';
            remainStr += remainSeconds ? (remainSeconds + '秒') : '';
            break;
            
          case 2:
            remainStr += (remainHours + ':' + remainMinutes + ':' + remainSeconds);
            break;
          
          case 3:
            remainStr += (remain + '秒');
        }
        
      } else {

        //  formating
        switch (format) {
          case 1:
            remainStr = '0秒';
            break;
            
          case 2:
            remainStr = '0:0:0';
            break;
            
          case 3:
            remainStr = '0';
        }

        //  stop counter
        counter&&clearInterval(counter);
        
        //  dispatch a timeover event
        setTimeout(function () {
          wrapper.dispatchEvent(timeOverEvt);
        }, 1);
      }
            
      // output count down
      wrapper.innerHTML = remainStr;
    }
    
    // call renderCounter immediately
    renderCounter();

    var counter = setInterval(renderCounter, step * MS_IN_SEC);
  };
  $.extend(APP, timer);
})(window.Zepto);