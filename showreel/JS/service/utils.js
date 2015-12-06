/**
* @file utils.js
* @author zhaowei
*/
(function () {
	var exports, digi2chn, escapeXml, justNormalChar;
	digi2chn = function (raw) {
		/**
		* @method digi2chn convert digits in string to chinese e.g 沪A100032 => 沪A一零零零三二
		* @param raw {String} string to be converted
		*/
		var DICT_DIGI_CHN = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
			tempArr = raw.split(''),
			output = '';

		tempArr.forEach(function (item) {
			var maybeDigit = +item;
			if (item === ' ' || isNaN(maybeDigit)) {
				output += item;
				return;
			}
			output += DICT_DIGI_CHN[maybeDigit];
		});
		return output;
	};

 	escapeXml = function (unsafe, clear) {
 		/**
 		* @param unsafe {String}
 		* @param clear {Boolean} default false
 		*/
 		clear = clear || false;
	    return unsafe.replace(/[<>&'"\?%]/g, function (c) {
	    	if (clear) {
	    		return '';
	    	}
	        switch (c) {
	            case '<': return '&lt;';
	            case '>': return '&gt;';
	            case '&': return '&amp;';
	            case '\'': return '&apos;';
	            case '"': return '&quot;';
	            case '\?': return '&quest;';
	            case '%': return '&percnt;';
	        }
	    });
	};

	justNormalChar = function (string) {
		/**
		* @method justNormalChar 仅允许正常字符，包括英文字母、数字、中文、短横
		*/
		return string.replace(/[^\u4E00-\u9FA5\w-]/g, '');
	};

	exports = {digi2chn: digi2chn, escapeXml: escapeXml, justNormalChar: justNormalChar};
	$.extend(APP, exports);
})(window.Zepto);