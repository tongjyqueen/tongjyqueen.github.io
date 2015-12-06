
window.onload = function() {
    //模态窗口

    var doc =document;
    var has_knowObj = doc.getElementById('has_know');
    var call_serversObj = doc.getElementById('call_servers');
    var shadeObj = doc.getElementById('shade');
    var modal_win_contentObj = doc.getElementById('modal_win_content');
    var modal_winObj = doc.getElementById('modal_win');
    has_knowObj.onclick = function() {
        alert('知道了');
        modal_win_contentObj.remove();
        modal_winObj.remove();
        shadeObj.remove();

    };

    call_serversObj.onclick = function() {
        alert('联系客服了！');
        modal_win_contentObj.remove();
        modal_winObj.remove();
        shadeObj.remove();
    };

};














