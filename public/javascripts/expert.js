/*$(document).ready(function () {
    var alertStat = sessionStorage.getItem('alertStat')

    if (email && alertStat == true) {
        sessionStorage.setItem('alert', true)
    } else if (!email || alertStat == false) {
        sessionStorage.setItem('alert', false)
    }
});*/

var selectList = $('.select-list'),
closeSelectBtn = $('.close-select');

selectList.on('change',function () { 
    //e.preventDefault();
    console.log(selectList.val())
    localStorage.setItem('expert_job', selectList.val())
    var exp = selectList.val()
    copyToClipboard(selectList.val())
    alert('Preferred expert: '+exp+', has been copied to clipboard. Please paste into required field')
    closeSelect()
    setTimeout(() => {
        if (email || title == 'Dashboard') {
            maximizeChat()
        } else{
            window.location.href = '/dashboard?'+exp
        }
    }, 800);
});

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(element).select();
    document.execCommand("copy");
    $temp.remove();
}

function closeSelect() {
    $('.search-form').removeClass('select-exp').find('label').show()
    closeSelectBtn.addClass('fade-out')
}