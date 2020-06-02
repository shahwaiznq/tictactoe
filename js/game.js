const game = {
    player1: {id: 'player1', name: 'Shahwaiz', score: 0},
    player2: {id: 'player2', name: 'Majin Boo', score: 0},
    Nobody: {id: 'Nobody', name: 'Nobody', score: 0},
    playerTurn: 'player1',

    winner: '',

    board: [["","",""],["","",""],["","",""]],
    webpage: [['#one','#two','#three'],['#four','#five','#six'],['#seven','#eight','#nine']],

    changePlayer: function () {
        if (this.playerTurn === this.player1.id){
            this.playerTurn = this.player2.id;
        } else {
            this.playerTurn = this.player1.id;
        }
    },

    otherPlayer: function () {
        if (this.playerTurn === this.player1.id){
            return this.player2.id;
        } else {
            return this.player1.id;
        }
    },

    searchBlock: function (blockId) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if( blockId === this.webpage[i][j]){
                    return [i,j];
                }
            }
        }
    },

    selectBlock: function (blockId) {
        let loc = this.searchBlock(blockId);
        this.board[loc[0]][loc[1]] = this.playerTurn;
        this.checkWinner();
        this.changePlayer();
    },

    openSlots: function () {
        let slots = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] === ''){
                    slots++
                }
            }
        }
        return slots;
    },

    blockOccupied: function (blockId) {
        let x = this.searchBlock(blockId);
        if (this.board[x[0]][x[1]] === "") {
            return false;
        }
        return true;
    },

    checkWinner: function () {
        //horzontal
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] === this.board[i][1] && this.board[i][0] === this.board[i][2] && this.board[i][0] != ""){
                this.winner = this.playerTurn;
                gameOver();
                return this.winner;
            }
        }
        //vertical
        for (let i = 0; i < 3; i++) {
            if (this.board[0][i] === this.board[1][i] && this.board[0][i] === this.board[2][i] && this.board[0][i] != ""){
                this.winner = this.playerTurn;
                gameOver();
                return this.winner;
            }
        }
        //diagonal
        if (this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2] && this.board[0][0] != ""){
            this.winner = this.playerTurn;
            gameOver();
            return this.winner;
        } 
        if (this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0] && this.board[0][2] != ""){
            this.winner = this.playerTurn;
            gameOver();
            return this.winner;
        }
        if (this.openSlots() === 0){
            this.winner = 'Nobody';
            gameOver();
            return this.winner;
        } 
        return null;
    },

    reset: function () {
        this.board = [["","",""],["","",""],["","",""]];
    },
}