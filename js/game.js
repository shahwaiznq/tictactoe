const game = {
    player1: '',
    player2: '',
    playerTurn: 'player1',

    winner: '',

    board: [["","",""],["","",""],["","",""]],
    webpage: [['#one','#two','#three'],['#four','#five','#six'],['#seven','#eight','#nine']],

    changePlayer: function () {
        if (this.playerTurn === 'player1'){
            this.playerTurn = 'player2';
        } else {
            this.playerTurn = 'player1';
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
        if (this.board[0][3] === this.board[1][1] && this.board[0][3] === this.board[3][0] && this.board[0][3] != ""){
            this.winner = this.playerTurn;
            gameOver();
            return this.winner;
        }
        if (this.openSlots() === 0){
            this.winner = 'No one';
            gameOver();
            return this.winner;
        } 
        return null;
    },
}