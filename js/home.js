const tictac = game;

let player1Icon = 'url(img/bunny.gif)';
let player2Icon = 'url(img/comp.gif)';

let computer = false;
let human = false;

let difficulty = '';

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

const pSelect = function (blockId, checkvs = computer) {
    $(blockId).on('click', function () {
        if(tictac.blockOccupied(blockId) === false){
            backgroundChange(blockId);
            tictac.selectBlock(blockId);
            if(checkvs){
                if (tictac.playerTurn === tictac.player2.id) {
                    compMove(difficulty);
                }
            }
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
    tictac.reset();
    tictac.winner = '';
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

const opponentReset = function () {
    computer = false;
    human = false;
    $('#pvp').css('opacity', '100%');
    $('#pve').css('opacity', '100%');
    $('#difficulty').hide("slide", { direction: "left" }, 500);
}

const difficultyReset = function () {
    $('#easy').css('opacity', '100%');
    $('#medium').css('opacity', '100%');
    $('#hard').css('opacity', '100%');
}

const addDifficulty = function (level) {
    $(`#${level}`).on('click', function() {
        difficultyReset();
        $(`#${level}`).css('opacity', '50%');
        difficulty = level;
    });
}

const compMove = function (difficulty) {
    if (difficulty === 'easy') {
        while (tictac.playerTurn === tictac.player2.id) {
            let x= Math.floor(Math.random()*3);
            let y= Math.floor(Math.random()*3);
            let selected = tictac.webpage[x][y];
            if(tictac.blockOccupied(selected) === false){
                backgroundChange(selected);
                tictac.selectBlock(selected);
            } else {
                console.log('computer thinking')
            }
        }
    }

}

$(document).ready(function () {

    $('.character').hide();
    $('#difficulty').hide();
    $('.chooser').css('border-top', '15px solid grey');
    $('.chooser').addClass('slide-up', 600, 'easeOutBounce');

    $('#pvp').on('click', function () {
        opponentReset();
        human = true;
        $('#pvp').css('opacity', '50%');
    });
    $('#pve').on('click', function () {
        opponentReset();
        computer = true;
        $('#pve').css('opacity', '50%');
        $('#difficulty').show("slide", { direction: "left" }, 600);
    });

    addDifficulty('easy');
    //addDifficulty('medium');
    //addDifficulty('hard');


    $('#computer-confirm').on('click', function () {
        if (human || (computer && difficulty !== '')) {
            $('.chooser').addClass('slide-down', 600, 'easeOutBounce', function () {
                $('.chooser').removeClass('slide-up');
                $('.chooser').removeClass('slide-down');
                $('.chooser').css('border-top', '15px solid red');
                $('.opponent').hide();
                $('.character').show();
                $('.chooser').addClass('slide-up', 600, 'easeOutBounce');
            });


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
                    $('.chooser').addClass('slide-down', 600, 'easeOutBounce', function () {
                        $(selected).remove();
                        $('#player-name').val('');
                    });

                    if (computer) {
                        tictac.player2.name = 'Computer';
                        $('#p2-name').text(tictac.player2.name);

                        pSelect('#one');
                                pSelect('#two');
                                pSelect('#three');
                                pSelect('#four');
                                pSelect('#five');
                                pSelect('#six');
                                pSelect('#seven');
                                pSelect('#eight');
                                pSelect('#nine');

                    } else {
                        $('.chooser').addClass('slide-down', 600, 'easeOutBounce', function () {
                            $('.chooser').removeClass('slide-up')
                            $('.chooser').removeClass('slide-down')
                            $('.chooser').css('border-top', '15px solid blue')
                            $('.chooser').addClass('slide-up', 600, 'easeOutBounce');
                        });
                        const p2Conf = $('#player-confirm').on('click', function () {
                            tictac.player2.name = $('#player-name').val();
                            if (playerPicked(2)){
                                player2Icon = tictac.player2.token;
                                $('#p2-name').text(tictac.player2.name);
                                $('.chooser').addClass('slide-down', 600, 'easeOutBounce');
                                
                                $('#player-confirm').off();
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
                }
            });
        }
    });

    

    


})