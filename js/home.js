const tictac = game;

let player1Icon = 'url(img/bunny.gif)';
let player2Icon = 'url(img/monkey.gif)';

let bunny;
let monkey;
let chicken;
let kitten;

animals = [bunny, monkey, chicken, kitten];

const buttonOff = function(){
    $('#player-confirm').off();
}

let selected;

const icon =  {
    bunny: 'url(img/bunny.gif)',
    monkey: 'url(img/monkey.gif)',
    chicken: 'url(img/chicken.gif)',
    kitten: 'url(img/kitten.gif)'
}

let p1Conf;
let p2Conf;

let timeout;

const backgroundChange = function (blockId) {
    if (tictac.playerTurn === tictac.player1.id){
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

const updateScores = function () {
    $('#score1').text(tictac.player1.score);
    $('#score2').text(tictac.player2.score);
    $('#score3').text(tictac.Nobody.score);
}

const resetBoard = function () {
    $('div.row div').css('background-image', 'none');
    tictac.reset()
    $('.game-over').css('display', 'none');
}

const gameOver = function () {
    $('#winner').text(tictac[tictac.winner].name);
    tictac[tictac.winner].score++;
    updateScores();
    $('.game-over').css('display', 'flex');
    window.setTimeout(() => {
        resetBoard();
    }, 3000);
}

const playerPicked = function (num) {
    if (tictac[`player${num}`].token === '' || tictac[`player${num}`].name === ''){
        return false;
    }
    return true;
}

const tokenReset = function () {
    $('#bunny').css('opacity', '100%');
    $('#monkey').css('opacity', '100%');
    $('#kitten').css('opacity', '100%');
    $('#chicken').css('opacity', '100%');
}

const tokenAssign = function (animal, num, player) {
    animals[num] = $(`#${animal}`).on('click', function () {
        tictac[`player${player}`].token = icon[animal];
        tokenReset();
        $(`#${animal}`).css('opacity', '70%');
        selected = `#${animal}`;
    });
}

$(document).ready(function () {

    $('.chooser').addClass('slide-up', 1000, 'easeOutBounce');

    tokenAssign('bunny', 1, 1);
    tokenAssign('monkey', 2, 1);
    tokenAssign('chicken', 3, 1);
    tokenAssign('kitten', 4, 1);

    const p1Conf = $('#player-confirm').on('click', function () {
        tictac.player1.name = $('#player-name').val();
        if (playerPicked(1)){
            buttonOff();
            player1Icon = tictac.player1.token;
            $('#p1-name').text(tictac.player1.name);
            tokenAssign('bunny', 1, 2);
            tokenAssign('monkey', 2, 2);
            tokenAssign('chicken', 3, 2);
            tokenAssign('kitten', 4, 2);
            $(selected).remove();
            $('.chooser').addClass('slide-down', 1000, 'easeOutBounce', function () {
                $('.chooser').removeClass('slide-up')
                $('.chooser').removeClass('slide-down')
                $('.chooser').css('border-top', '15px solid blue')
                $('.chooser').addClass('slide-up', 1000, 'easeOutBounce');
            });
            $('#player-name').val('');
            
            
            const p2Conf = $('#player-confirm').on('click', function () {
                tictac.player2.name = $('#player-name').val();
                if (playerPicked(2)){
                    clearTimeout(timeout);
                    player2Icon = tictac.player2.token;
                    $('#p2-name').text(tictac.player2.name);
                    $('.chooser').addClass('slide-down', 1000, 'easeOutBounce');
                    
                    $('player-confirm').off();
                    $('.chooser').remove();
                    pSelect('#one');
                    pSelect('#two');
                    pSelect('#three');
                    pSelect('#four');
                    pSelect('#five');
                    pSelect('#six');
                    pSelect('#seven');
                    pSelect('#eight');
                    pSelect('#nine');
                }
            });
        }
    });

    

    


})