const {GRID_SIZE} = require('./constants');


module.exports = {
	initGame,
	gameLoop,
	getUpdatedVelocity,
}

function initGame(){
	const state = createGameState();
	return state;
}

function createGameState(){

	return {
    players: [{
      pos: {
        x: 3,
        y: 10,
      },
      vel: {
        x: 1,
        y: 0,
      },
      bike: [
        {x: 1, y: 10},
        {x: 2, y: 10},
        {x: 3, y: 10},
      ],
    }, {
      pos: {
        x: 18,
        y: 10,
      },
      vel: {
        x: 0,
        y: 0,
      },
      bike: [
        {x: 20, y: 10},
        {x: 19, y: 10},
        {x: 18, y: 10},
      ],
    }],
    
    gridsize: GRID_SIZE,
  };
}


function gameLoop(state){
	if(!state){
		return;
	}
	const playerOne = state.players[0];
	const playerTwo = state.players[1];

	playerOne.pos.x += playerOne.vel.x;
	playerOne.pos.y += playerOne.vel.y;

	playerTwo.pos.x += playerTwo.vel.x;
	playerTwo.pos.y += playerTwo.vel.y;


	if(playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE ){
		return 2;
	}

	if(playerTwo.pos.x < 0 || playerTwo.pos.x > GRID_SIZE || playerTwo.pos.y < 0 || playerTwo.pos.y > GRID_SIZE ){
		return 1;
	}

	

	if(playerOne.vel.x || playerOne.vel.y){
		for(let cell of playerOne.bike){
			if(cell.x === playerOne.pos.x && cell.y === playerOne.pos.y){
				return 2;
			}
		}

		playerOne.bike.push({ ...playerOne.pos});
		playerOne.bike.unshift(); 
	}

	if(playerTwo.vel.x || playerTwo.vel.y){
		for(let cell of playerTwo.bike){
			if(cell.x === playerTwo.pos.x && cell.y === playerTwo.pos.y){
				return 1;
			}
		}

		playerTwo.bike.push({ ...playerTwo.pos});
		playerTwo.bike.unshift(); 
	}
	return false;

}

function getUpdatedVelocity(keyCode){
	switch(keyCode){
		case 37: { // left 
			return { x: -1, y: 0 };
		}
		case 38: { // down 
			return { x: 0, y: -1 };
		}
		case 39: { // right 
			return { x: 1, y: 0};
		}
		case 40: { // up 
			return { x: 0, y: 1 };
		}
	}
}