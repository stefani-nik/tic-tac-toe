'use strict';

let board;
const human='X';
const ai='O';
const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

let start = () => {
    $('.board td').text('');
    $('.message').text('');
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    $(document).ready(() => {
        $('td').on('click', (e) => {
            if(e.target.innerText == ''){
                moveHuman(e);
            };
        })
    })
}

let moveHuman = (cell) => {
    board[cell.target.id] = human;
    $(cell.target).text(human);
    checkGameOver();
    moveAI();
}

let moveAI = () => {
    let move = minimax(ai).index;
    board[move] = ai;
    $('#'+ move).text(ai);
    checkGameOver();
}

let checkGameOver = () => {
    if(checkWin(human)){
        displayMessage("You won!");
    }
    if(checkWin(ai)){
        displayMessage("You lost!");
    }
    if(checkTie()){
        displayMessage("It's a tie!");
    }

    return false;
}

let checkWin = (player) => {

    let plays = board.reduce((a, e, i) =>
            (e === player) ? a.concat(i) : a, []);

    for (let [index, win] of wins.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
           return true;
        }
    }
    return false;
}

let checkTie = () => {
	return board.filter(i => typeof i == 'number').length == 0;
}

let displayMessage = (message) => {
    $('.message').text(message);
    $('td').off('click');
}


let minimax = (player) => {

    let possibleMoves = board.filter(i => typeof i == 'number');

	if (checkWin(human)) {
        return { score : -10 };
    }    
    else if (checkWin(ai)){
        return { score : 10 };
    }
	else if (possibleMoves.length === 0){
        return { score : 0 };
    }
		
    let moves = [];
    
    for (let possibleMove of possibleMoves)
    {
        let score;
        let result;
        let index = board[possibleMove];
        
		board[possibleMove] = player;

		if (player == ai) {
            result = minimax(human);
		} else {
			result = minimax(ai);
		}

        score = result.score;
		board[possibleMove] = index;

		moves.push({index, score});
    }


    let bestMove;

	if(player === ai) {
        let bestScore = -10000;   
        for(let move in moves)
        {
            let currentScore = moves[move].score;
            if (currentScore > bestScore) {
				bestScore = currentScore;
				bestMove = move;
			}
        }
	} else {
		let bestScore = 10000;
        for(let move in moves)
        {
            let currentScore = moves[move].score;
            if (currentScore < bestScore) {
                bestScore = currentScore;
				bestMove = move;
			}
        }
	}
	return moves[bestMove];
}

(function Init(){
    start();
})();
