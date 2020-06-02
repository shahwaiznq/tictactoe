const tictac = game;

let player1Icon = 'url(img/bunny.gif)';
let player2Icon = 'url(img/monkey.gif)';

const backgroundChange = function (blockId) {
    if (tictac.playerTurn === 'player1'){
        $(blockId).css('background-image', player1Icon);
    }  else {
        $(blockId).css('background-image', player2Icon);
    }
}

const pSelect = function (blockId) {
    $(blockId).on('click', function () {
        if(tictac.blockOccupied(blockId) === false){
            backgroundChange(blockId);
            tictac.selectBlock(blockId);
        } else {
            console.log('Pick a free tile dummbass')
        }
    });
}

const resetBoard = function () {
    $('div.row div').css('background-image', 'none');
    tictac.reset()
    $('.game-over').css('display', 'none');
}

const gameOver = function () {
    $('#winner').text(tictac.winner);
    $('.game-over').css('display', 'flex');
    window.setTimeout(() => {
        resetBoard();
    }, 3000);
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