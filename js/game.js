const game = {
    player1: '',
    player2: '',
    playerTurn: 'player1',

    board: [[1,2,3],[1,2,3],[1,2,3]],

    changePlayer: function () {
        if (this.playerTurn === 'player1'){
            this.playerTurn = 'player2';
        } else {
            this.playerTurn = 'player1';
        }
    },

    selectBlock: function (blockId) {
        this.changePlayer();
    }
}