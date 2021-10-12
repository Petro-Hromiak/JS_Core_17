
$(document).ready(function () {
    random();

    $(`.start`).on(`click`, function () {
        timerStart();
        $(`.start`).prop('disabled', true);
        $(`.check-result`).prop('disabled', false);
    })

    $('.sort').sortable({
        connectWith: '.drop, .drag',
        start: function () {
            if ($(`.start`).prop('disabled') == false) {
                $(`.start`).click();
            }
        }
    })

    let check = true;
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

    $('.check-result').on('click', function () {
        $(`.popup`).addClass(`open`)
    })

    $('.check').on('click', function () {

        for (let i = 0; i < $('.pieceDrag').length; i++) {
            if ($(`.drop div`).eq(i).attr(`id`) != numbers[i]) {
                check = false;
                break;
            }
        }
        if (check) {
            checkDisabled()
            $(`.popup__text`).text(`Woohoo, well done, you did it!`)
            timerNum = saveNum
        }
        else {
            $(`.popup__text`).text(`It's a pity, but you lose!`)
            checkDisabled()
        }
        check = true;
    })
    $('.new').on('click', function () {
        refreshAll()
        random()
    })
})



let timer
let timerValue = $(`.timer`).text();
let saveNum = parseInt(timerValue) * 60;
let timerSec;
let timerToShow
function timerStart() {
    timer = setInterval(() => {
        if (saveNum >= 0) {
            timerSec = saveNum % 60
        let timerMinut = parseInt(saveNum / 60);
        saveNum -= 1
        timerToShow = [`00`, `00`];
        timerToShow[0] = timerMinut < 10 ? `0${timerMinut}` : timerMinut;
        timerToShow[1] = timerSec < 10 ? `0${timerSec}` : timerSec;
        $(`.timer`).text(timerToShow.join(`:`))
        $(`.timer`).text()
        $(`.popup__text`).text(`You still have time, you sure?${timerToShow.join(':')} `)
            
        }
        else{
            $(`.popup`).addClass(`open`)
            $(`.popup__text`).text(`It's a pity, but you lose!`)
            checkDisabled()
        }
        

    }, 1000);

}

function random() {
    let $divs = $('.drag div');
    let arr = [];

    $divs.each(function () {
        arr.push($(this).detach());
    });
    arr.sort(function () {
        return Math.random() - 0.5;
    });
    for (index in arr) {
        $('.drag').append(arr[index]);
    }
};

function refreshAll() {
    clearInterval(timer);
    $(`.timer`).text(`02:00`)
    timerValue = $(`.timer`).text();
    saveNum = parseInt(timerValue) * 60;
    random();
    $('.drag').append($('.drop div').remove())
    $(`.start`).prop('disabled', false);
    $(`.check-result`).prop('disabled', true);
    $(`.check`).show();


}
function closePopup() {
    document.querySelector(`.popup`).classList.remove(`open`)
}

function checkDisabled() {
    
    clearInterval(timer);
    $(`.check-result`).prop('disabled', true);
    $(`.check`).hide();
}
