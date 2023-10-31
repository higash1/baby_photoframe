// iPadのスクロールを禁止
function disableScroll(event) {
    event.preventDefault();
}

// 定数
const DAY_LIST = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_LIST_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// フラグ
let init_flag = true;

// ゼロ埋め
function zeroPadding(num, len) {
    return (Array(len).join('0') + num).slice(-len);
}

// 時計の表示
function showClock() {
    let nowTime  = new Date();
    const nowYear  = nowTime.getFullYear();
    const nowMonth = nowTime.getMonth();
    const nowDate  = nowTime.getDate();
    const nowDay   = nowTime.getDay();
    const nowHour  = zeroPadding(nowTime.getHours(), 2);
    const nowMin   = zeroPadding(nowTime.getMinutes(), 2);
    const nowSec   = zeroPadding(nowTime.getSeconds(), 2);

    // $('.photoframe-clock-ymd').html(nowYear + '/' + zeroPadding(nowMonth + 1, 2) + '/' + zeroPadding(nowDate, 2));
    // $('.photoframe-clock-day').html(DAY_LIST[nowDay]);
    // $('.photoframe-clock-time').html(nowHour + ':' + nowMin + ':' + nowSec);
    $('.photoframe-clock-time').html(nowHour + ':' + nowMin);

    // ページ読み込み時・毎時0分に時計位置を変更（焼付き防止）
    if (init_flag === false && !(nowMin == '00' && nowSec == '00')) {return;}
    place();

    // ページ読み込み時・日付変更時にカレンダーを更新
    if (init_flag === false && !(nowHour == '00' && nowMin == '00' && nowSec == '00')) {return;}
    init_flag = false;

    // 祝日一覧APIより取得 (https://holidays-jp.github.io/)
    $.getJSON("https://holidays-jp.github.io/api/v1/date.json", (data) => {
        let lastMonthTime = new Date(nowYear, nowMonth, 0);
        const lastMonthYear = lastMonthTime.getFullYear();
        const lastMonthMonth = lastMonthTime.getMonth();
        const lastMonthCount = lastMonthTime.getDate();
        let nextMonthTime = new Date(nowYear, nowMonth + 1, 1);
        const nextMonthYear = nextMonthTime.getFullYear();
        const nextMonthMonth = nextMonthTime.getMonth();
        let holidaysLastMonth = [];
        let holidaysThisMonth = [];
        let holidaysNextMonth = [];

        $.each(Object.keys(data), function (index, value) {
            holiday = value.split('-');
            if (holiday[0] == lastMonthYear && holiday[1] == zeroPadding(lastMonthMonth + 1, 2)) {
                holidaysLastMonth.push(Number(holiday[2]));
            } else if (holiday[0] == nowYear && holiday[1] == zeroPadding(nowMonth + 1, 2)) {
                holidaysThisMonth.push(Number(holiday[2]));
            } else if (holiday[0] == nextMonthYear && holiday[1] == zeroPadding(nextMonthMonth + 1, 2)) {
                holidaysNextMonth.push(Number(holiday[2]));
            }
        });

        const startDate = new Date(nowYear, nowMonth, 1);
        const endDate = new Date(nowYear, nowMonth + 1, 0);
        const endDateCount = endDate.getDate();
        const startDay = startDate.getDay();
        const endDay = endDate.getDay();
        let dayCount = 1;

        let calendarHtml = '<caption class="photoframe-calendar-ym">' + nowYear + '&nbsp;-&nbsp;' + zeroPadding(nowMonth + 1, 2) + '</caption>';

        calendarHtml += '<tr>';
        for (let i = 0; i < DAY_LIST_SHORT.length; i++) {
            if (i == 0) {
                // 日曜
                calendarHtml += '<th class="photoframe-calendar-holiday">' + DAY_LIST_SHORT[i] + '</th>';
            } else if (i == 6) {
                // 土曜
                calendarHtml += '<th class="photoframe-calendar-saturday">' + DAY_LIST_SHORT[i] + '</th>';
            } else {
                // 平日
                calendarHtml += '<th class="">' + DAY_LIST_SHORT[i] + '</th>';
            }
        }
        calendarHtml += '</tr>';

        let weeks = Math.ceil((startDay + endDateCount) / 7);

        for (let w = 0; w < weeks; w++) {
            calendarHtml += '<tr>';

            for (let d = 0; d < 7; d++) {
                if (w == 0 && d < startDay) {
                    // 前月
                    let dstDay = lastMonthCount - startDay + d + 1;
                    calendarHtml += '<td class="';
                    if (holidaysLastMonth.includes(dstDay) || d == 0) {
                        // 日曜・祝日
                        calendarHtml += 'photoframe-calendar-holiday-others';
                    } else {
                        // 平日
                        calendarHtml += 'photoframe-calendar-weekday-others';
                    }
                    calendarHtml += '">' + dstDay + '</td>';
                } else if (dayCount > endDateCount) {
                    // 翌月
                    let dstDay = d - endDay;
                    calendarHtml += '<td class="';
                    if (holidaysNextMonth.includes(dstDay)) {
                        // 祝日
                        calendarHtml += 'photoframe-calendar-holiday-others';
                    } else if (d == 6) {
                        // 土曜
                        calendarHtml += 'photoframe-calendar-saturday-others';
                    } else {
                        // 平日
                        calendarHtml += 'photoframe-calendar-weekday-others';
                    }
                    calendarHtml += '">' + dstDay + '</td>';
                } else {
                    // 今月
                    calendarHtml += '<td class="photoframe-calendar-day-' + dayCount + ' ';
                    if (holidaysThisMonth.includes(dayCount) || d == 0) {
                        // 日曜・祝日
                        calendarHtml += 'photoframe-calendar-holiday';
                    } else if (d == 6) {
                        // 土曜
                        calendarHtml += 'photoframe-calendar-saturday';
                    }
                    calendarHtml += '">' + dayCount + '</td>';

                    dayCount++;
                }
            }
            calendarHtml += '</tr>';
        }

        $('.photoframe-calendar').html(calendarHtml);

        // 今日
        $('.photoframe-calendar-day-' + nowDate).addClass('table-active');
    });
}

function place() {
    let nowTime  = new Date();
    const nowHour = nowTime.getHours();

    const aspectRatio = $(window).width() / $(window).height();

    // 1時間毎に時計位置を変更（焼付き防止）
    if (nowHour % 2 == 0) {
        if (aspectRatio > 1.0) {
            $('#photoframe-clock-left').removeClass('d-none');
            $('#photoframe-clock-top').addClass('d-none');
            $('#photoframe-clock-right').addClass('d-none');
            $('#photoframe-clock-bottom').addClass('d-none');
        } else {
            $('#photoframe-clock-left').addClass('d-none');
            $('#photoframe-clock-top').removeClass('d-none');
            $('#photoframe-clock-right').addClass('d-none');
            $('#photoframe-clock-bottom').addClass('d-none');
        }
    } else {
        if (aspectRatio > 1.0) {
            $('#photoframe-clock-left').addClass('d-none');
            $('#photoframe-clock-top').addClass('d-none');
            $('#photoframe-clock-right').removeClass('d-none');
            $('#photoframe-clock-bottom').addClass('d-none');
        } else {
            $('#photoframe-clock-left').addClass('d-none');
            $('#photoframe-clock-top').addClass('d-none');
            $('#photoframe-clock-right').addClass('d-none');
            $('#photoframe-clock-bottom').removeClass('d-none');
        }
    }
}

// 読み込み時に実行
$(document).ready(function () {
    $(window).resize(function () {place();});

    place();

    $('.photoframe-slideshow').slick({
        autoplay: true,
        fade: true,
        centerMode: true,
        pauseOnHover: false,
        arrows: false,
        autoplaySpeed: 10000,
    });
});

// 定期実行
setInterval('showClock()', 1000);
