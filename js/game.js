const game = {
    player1: {id: 'player1', name: 'Player One', score: 0, token: ''},
    player2: {id: 'player2', name: 'Player Two', score: 0, token: ''},
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

    bestMove: function () {
        // AI to make its turn
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            // Is the spot available?
            if (this.board[i][j] == '') {
              this.board[i][j] = this.player2.id;
              let score = this.minimax(this.board, 0, false);
              this.board[i][j] = '';
              if (score > bestScore) {
                bestScore = score;
                move = { i, j };
              }
            }
          }
        }
        return [move.i, move.j];
    },

    scores: {
        player1: -10,
        player2: 10,
        tie: 0
    },

    minimax: function (board, depth, isMaximizing) {
        let result = this.checkWin();
        if (result !== null) {
          return this.scores[result];
        }
      
        if (isMaximizing) {
          let bestScore = -Infinity;
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              // Is the spot available?
              if (board[i][j] == '') {
                board[i][j] = this.player2.id;
                let score = this.minimax(board, depth + 1, false);
                board[i][j] = '';
                bestScore = Math.max(score, bestScore);
              }
            }
          }
          return bestScore;
        } else {
          let bestScore = Infinity;
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              // Is the spot available?
              if (board[i][j] == '') {
                board[i][j] = this.player1.id;
                let score = this.minimax(board, depth + 1, true);
                board[i][j] = '';
                bestScore = Math.min(score, bestScore);
              }
            }
          }
          return bestScore;
        }
    },

    equals3: function (a, b, c) {
        return a == b && b == c && a != '';
    },


    checkWin: function () {
        let winner = null;
      
        // horizontal
        for (let i = 0; i < 3; i++) {
          if (this.equals3(this.board[i][0], this.board[i][1], this.board[i][2])) {
            winner = this.board[i][0];
          }
        }
      
        // Vertical
        for (let i = 0; i < 3; i++) {
          if (this.equals3(this.board[0][i], this.board[1][i], this.board[2][i])) {
            winner = this.board[0][i];
          }
        }
      
        // Diagonal
        if (this.equals3(this.board[0][0], this.board[1][1], this.board[2][2])) {
          winner = this.board[0][0];
        }
        if (this.equals3(this.board[2][0], this.board[1][1], this.board[0][2])) {
          winner = this.board[2][0];
        }
      
        if (winner == null && this.openSlots() == 0) {
          return 'tie';
        } else {
          return winner;
        }
    }
}