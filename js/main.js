const months=['يَنَايِرُ','فِبْرَايِرُ','مَارِسُ','أَبْرِيلُ','مَايُو','يُونْيُو','يُولْيُو','أَغُسْطُسُ','سِبْتَمْبَرُ','أُكْتُوبَرُ','نُوفَمْبَرُ','دِيسَمْبَرُ'],monthMin = ['','','','','','','','','','','',''],days = ['‫الأحد','‫الاثنين','‫الثلاثاء','‫الأربعاء','الخميس','الجمعة‬','السبت‬'],daysMin = ['','','','','','',''],seasons = ['شِتَاء','رَبِيع','صَيْف','خَرِيف'];function postDate(daysName, daysMinName, monthsName, monthsMinName, seasonsName) {const _counterLength = 60;for (let counter = 0; counter < _counterLength; counter++) {innerDate(counter, 'date-');innerDate(counter, 'date')} function innerDate(counter, dateType) {let newCounter;dateType === 'date-' ? newCounter = -counter : newCounter = counter; const _msInDay = 86400000, _localDate = new Date(Date.now() + (newCounter * _msInDay)), _day = _localDate.getDate(), _month = _localDate.getMonth() + 1, _year = _localDate.getFullYear(); const dayDefault = addZero(_day), monthDefault = addZero(_month), defaultDate = dayDefault + '.' + monthDefault + '.' + _year; const dateClass = dateType + counter, nodeList = document.querySelectorAll('.' + dateClass); for (let i = 0; i < nodeList.length; i++) {const dateFormat = nodeList[i].dataset.format;dateFormat !== undefined && dateFormat !== ''? nodeList[i].innerHTML = String(changeFormat(dayDefault, _month, _year, dateFormat, newCounter)): nodeList[i].innerHTML = defaultDate} } function changeFormat(_day, _month, _year, format, counter) { let innerFormat = format; const testFormat = ["dd","mm","yyyy","monthFull","year"], dateFormat = { dd: _day, mm: addZero(_month), yyyy: _year, monthFull: getMonthName(_month, monthsName, true), year: getYearWithCounter(_year, counter), }; for (let i = 0; i < testFormat.length; i++) { let string = testFormat[i]; let regExp = new RegExp(string); innerFormat = innerFormat.replace(regExp, dateFormat[string]); } return innerFormat.split(' ').join(' ') } function getMonthName(_month, monthsName, bigFirstLetter, counter) { const monthCounter = !!counter ? counter : 0; let month; _month + monthCounter > 12 ? month = monthCounter - (12 - _month) : month = _month + monthCounter; _month + monthCounter <= 0 ? month = 12 + monthCounter + 1 : month = _month + monthCounter; return changeFirstLetter(bigFirstLetter, monthsName[month - 1]) } function getYearWithCounter(year, counter) {return year + counter} function addZero(numb){return numb<10?'0'+numb:numb} function changeFirstLetter(isBig,str){return isBig&&str&&str.length>0?str[0].toUpperCase()+str.slice(1):str} }if (document.body.classList.contains('ev-date')) {document.addEventListener("DOMContentLoaded", function () {postDate(days, daysMin, months, monthMin, seasons)});}
// Smooth scroll
let links = document.querySelectorAll('a');

for (let i = 0; i < links.length; ++i) {
    links[i].addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('#order0').scrollIntoView( {
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Questions block
var steps = [false, false, false, false, false, false];
var curr_step = 1;
// переходы по шагам
function to_step(index, need_push) {
    curr_step = index;
    for (var i = 1; i < steps.length; i++) {
        if (!$("#step" + i).is(':hidden')) {
            $("#step" + i).hide();
        }
    };
    $("#step" + index).show();
    $("#progress_in").css({
        width: (100 * index/ steps.length) + "%"
    });
    $("#curr_step").text("الخطوة " + index + " من  " + (steps.length - 1));

    // Разделение на #step0, #other_steps и #last_step
    if (index + 1 == steps.length) { // если шаг равен общему количеству шагов
        if (!$("#other_steps").is(':hidden')) {
            $("#other_steps").hide();
            $("#last_step").show();

            $("#progress_in").css({
                width: 100 + "%"
            });
        }
    } else if (index > 0) { // если шаг больше ноля
        if ($("#other_steps").is(':hidden')) {
            $("#other_steps").show();
        }
        if (!$("#last_step").is(':hidden')) {
            $("#last_step").hide();
        }
    } else if (!$("#other_steps").is(':hidden')) { // если шаг равен нолю
        $("#other_steps").hide();
    }
}

(function ($) {

    $(document).ready(function () {
        to_step(1, true);
    }); // задаем первоначальный индекс

    $("#to_step1").click(function (event) {
        event.preventDefault();
        to_step(1, true);
    });
    $('input[name=type-home]').on('click', function (event) {
        event.preventDefault();
        to_step(2, true);
    });

    $('input[name=type-home2]').on('click', function (event) {
        event.preventDefault();
        to_step(3, true);
    });
    $('input[name=type-repair]').on('click', function (event) {
        event.preventDefault();
        to_step(4, true);
    });
    $('input[name=design-project]').on('click', function (event) {
        event.preventDefault();
        to_step(5, true);
    });
    // Отправка формы (нажатием на финальную кнопку)
    $("#to_submit").click(function (event) {
        event.preventDefault();
        $("#quiz_form").submit();
    });

})(jQuery);

// Comment form
let commentForm = document.querySelector('.comment-wrap'),
    userName = document.querySelector('.userName'),
    userSurname = document.querySelector('.userSurname'),
    userComment = document.querySelector('.userComment'),
    sendBtn = document.querySelector('.sendBtn');

sendBtn.addEventListener('click', function(event) {
    if (checkEmpty(userName, userSurname, userComment)) {
        event.preventDefault();
        commentForm.style.cssText = 'display: none';
        alert('شكرا لك! تم إرسال تعليقك الى الاعتدال.');
    }
});

// Custom File
let customFile = document.querySelector('.custom__field'),
    customText = document.querySelector('.custom__text');

customFile.addEventListener('change', function() {
    customText.innerHTML = 'تم تحميل الصورة';
    customText.style.cssText = 'color: green;';
});

// Check Empty
function checkEmpty (elem1, elem2, elem3) {
    if (elem1.value != '', elem2.value != '', elem3.value != '') {
        return true;
    } else {
        return false;
    }
}
