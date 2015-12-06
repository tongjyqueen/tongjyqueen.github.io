(function ($) {
    var exports,
        formatDateMMDDhhmm,
        formatDateYYYYMMDDhhmmss,
        parseDate,
        zeroPre;    // 将一位数字以前置'0'的方式补全，返回补全后的字符串

    zeroPre = function (digit) {
        var str;
        if (digit < 10) {
            str = '0' + digit;
        } else {
            str = '' + digit;
        }
        return str;
    }; 
    
    parseDate = function (date) {
        /**
        * @method parseDate convert dateString|miniseconds to js Date object
        * @param date {String|Number} `2015-04-06 09:51:29`|1429069032000
        */
        if (typeof date === 'number') {
            return new Date(date);
        }
        var Y, M, D, h, m, s;
        Y = date.slice(0, 4);
        M = date.slice(5, 7);
        D = date.slice(8, 10);
        h = date.slice(11, 13);
        m = date.slice(14, 16);
        s = date.slice(17, 19);
        
        return new Date(Y, M, D, h, m, s);
    };
    
    formatDateMMDDhhmm = function (date) {
        /**
        * @param date {String|Number} 毫秒数或YYYY-MM-DD hh:mm:ss
        */
        if (typeof date === 'number') {
            var dateObj = new Date(date);
            return '' + zeroPre(dateObj.getMonth() + 1) + '/' + zeroPre(dateObj.getDate()) 
                    + ' ' + zeroPre(dateObj.getHours()) + ':' + zeroPre(dateObj.getMinutes());
        }
        return date.slice(5, 16);
    };
    
    formatDateYYYYMMDDhhmmss = function (date) {
        /**
        * @param date {String|Number} 毫秒数或YYYY-MM-DD hh:mm:ss
        */
        if (typeof date === 'number') {
            var dateObj = new Date(date);
            return '' + dateObj.getFullYear() + '/' + zeroPre(dateObj.getMonth() + 1) + '/' + zeroPre(dateObj.getDate()) 
                    + ' ' + zeroPre(dateObj.getHours()) + ':' + zeroPre(dateObj.getMinutes()) + ':' + zeroPre(dateObj.getSeconds());
        }
        return date;
    };
    
    exports = {
        parseDate: parseDate, 
        formatDateMMDDhhmm: formatDateMMDDhhmm,
        formatDateYYYYMMDDhhmmss: formatDateYYYYMMDDhhmmss
    };
    $.extend(APP, exports);
})(window.Zepto);