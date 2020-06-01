const backgroundChange = function (blockId) {
    $(blockId).css('background-image', 'url(img/bunny.gif)');
}

const pSelect = function (blockId) {
    $(blockId).on('click', function () {
        backgroundChange(blockId);
    });
}

$(document).ready(function () {

    pSelect('#one');
    pSelect('#two');
    pSelect('#three');
    pSelect('#four');
    pSelect('#five');
    pSelect('#six');
    pSelect('#seven');
    pSelect('#eight');
    pSelect('#nine');



})