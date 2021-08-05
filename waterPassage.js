var runningFunctionBlock = false;
var temp_nextPos = {x:0, y:0, direction:0};

// The object kinds 
const ObjectType = {
	SOURCE: 0,
	PIPE: 1,
	BENDLEFT: 2,
	BENDRIGHT: 3,
	CHECKPIPE: 4,
	DOUBLEDUAL: 5,
	DOUBLELEFT: 6,
	DOUBLERIGHT: 7,
	PURIFIER: 8,
	FUNCTIONBLOCK: 9,
	FUNCTIONCALL: 10,
	END: 11,
	FURNACE: 12,
	COOLER: 13,
	TANK: 14
}

/**
 * FROZEN - the pipe is frozen
 * HEATDOWN - steam tried to go down
 * WATERUP - water tried to go up
 */
const errMsg = {
	FROZEN: -1,
	HEATDOWN: -2,
	WATERUP: -3
}


function objectName(type)
{
	switch(type)
	{
		case ObjectType.SOURCE:
			return "Source";
		case ObjectType.PIPE:
			return "Regular pipe";
		case ObjectType.BENDLEFT:
			return "Bendleft pipe";
		case ObjectType.BENDRIGHT:
			return "Bendright pipe";
		case ObjectType.CHECKPIPE:
			return "Check pipe";
		case ObjectType.DOUBLEDUAL:
			return "Double dual pipe";
		case ObjectType.DOUBLELEFT:
			return "Double left pipe";
		case ObjectType.DOUBLERIGHT:
			return "Double right pipe";
		case ObjectType.PURIFIER:
			return "Purifier";
		case ObjectType.FURNACE:
			return "Furnace";
		case ObjectType.COOLER:
			return "Cooler";
		case ObjectType.TANK:
			return "Tank";
		case ObjectType.END:
			return "End";
		case ObjectType.FUNCTIONBLOCK:
			return "Function block"
	}
}

// Directions
const Direction = {
	SOUTH: 1,
	NORTH: 2,
	EAST: 3,
	WEST: 4
}

function directionNames(dir)
{
	switch(dir)
	{
		case Direction.SOUTH:
			return "down";
		case Direction.NORTH:
			return "up";
		case Direction.EAST:
			return "right";
		case Direction.WEST:
			return "left";
	}
}


// Water purity level
const PurityLevel = {
	CLEAN: 0,
	HIGH_POLLUTED: 3,
	MEDIUM_POLLUTED: 2,
	LOW_POLLUTED: 1
}


// Purifies the water
function purifyWater(level)
{
	switch (level)
	{
		case PurityLevel.CLEAN:
			return PurityLevel.CLEAN;
		case PurityLevel.LOW_POLLUTED:
			return PurityLevel.CLEAN;
		case PurityLevel.MEDIUM_POLLUTED:
			return PurityLevel.LOW_POLLUTED;
		case PurityLevel.HIGH_POLLUTED:
			return PurityLevel.MEDIUM_POLLUTED;
		default:
			return level;
	} 
}

// Water phase level
const WaterPhase = {
	ICE: 0,
	WATER: 1,
	STEAM: 2
}

// Heats the water
function heatWater(level)
{
	switch (level)
	{
		case WaterPhase.ICE:
			return WaterPhase.WATER;
		case WaterPhase.WATER:
			return WaterPhase.STEAM;
		case WaterPhase.STEAM:
			return WaterPhase.STEAM;
		default:
			return level;
	} 
}

// Cools the water
function coolWater(level)
{
	switch (level)
	{
		case WaterPhase.ICE:
			return WaterPhase.ICE;
		case WaterPhase.WATER:
			return WaterPhase.ICE;
		case WaterPhase.STEAM:
			return WaterPhase.WATER;
		default:
			return level;
	} 
}

// For game objects  
class GameEntity
{
	constructor(kind, purity, phase, faceDirection, position)
	{
		this.kind_ = kind;
		this.purity_ = purity;
		this.phase = phase;
		this.faceDirection_  = faceDirection;
		this.position_ = position;
		this.inGrid_ = GameEntity.getInGrid(kind, faceDirection);
		this.traversed_ = 0;
	}
	
	// Checks if water in the object is clean
	get hasCleanWater() {
		return this.purity_ === PurityLevel.CLEAN
	}


	get traversed() {return this.traversed_;}
	increaseTraversed() {this.traversed_++;}
	resetTraversed() {this.traversed_ = 0}
	
	get inGrid(){ return this.inGrid_;}
	get kind(){ return this.kind_;}
	set purity(purityLevel){ this.purity_ = purityLevel;}
	get purity(){ return this.purity_;}
	get phase(){ return this.phase_;}
	set	phase(temp){ this.phase_ = temp;}
	
	// Passes the water to an object 
	// passWater(otherObject)
	// {
	// 	console.log("PassWater");
	// 	console.log("Before:" + otherObject.purity);
	// 	console.log("Before" + otherObject.phase);
	// 	if (this.kind_ === ObjectType.PURIFIER){
	// 		console.log("Purifying");
			
	// 		otherObject.purity = purifyWater(this.purity_);
	// 		console.log("After:" + otherObject.purity);
	// 	}
	// 	else if (this.kind_ === ObjectType.FURNACE){
	// 		console.log("Heating");
			
	// 		otherObject.phase = heatWater(this.phase_);
	// 		console.log(otherObject.phase);
	// 	}
	// 	else if (this.kind_ === ObjectType.COOLER){
	// 		console.log("Cooling");
	// 		otherObject.phase = coolWater(this.phase_);
	// 		console.log(otherObject.phase);
	// 	}
	// 	else {
	// 		console.log("Normal Pipe")
	// 		otherObject.purity = this.purity_;
	// 		otherObject.phase = this.phase_;
	// 	}
	// }

	passWater(otherObject)
	{
		console.log("PassWater");
		console.log("Before:" + otherObject.purity);
		console.log("Before" + otherObject.phase);
		if (this.kind_ === ObjectType.PURIFIER){
			console.log("Purifying");
			
			this.purity_ = purifyWater(this.purity_);
			console.log("After:" + this.purity_);
		}
		else if (this.kind_ === ObjectType.FURNACE){
			console.log("Heating");
			
			this.phase_ = heatWater(this.phase_);
			console.log("After:" + this.phase_);
		}
		else if (this.kind_ === ObjectType.COOLER){
			console.log("Cooling");
			this.phase_ = coolWater(this.phase_);
			console.log("After: "+this.phase_);
		}
		
		console.log("Normal Pipe")
		otherObject.purity = this.purity_;
		otherObject.phase = this.phase_;
	}
	
	get isMultipleInGrid()
	{
		let thisKind = this.kind_;
		return thisKind === ObjectType.END ||
			   thisKind === ObjectType.DOUBLELEFT ||
			   thisKind == ObjectType.DOUBLERIGHT;
	}

	// Checks if there is a connection between this and another object, and it is valid
	connectsTo(nextObject)
	{
		for (let out of this.outPos())
		{
			if (out.x === nextObject.position.x && out.y === nextObject.position.y)
			{
				if (nextObject.isMultipleInGrid)
				{
					for (let dir of nextObject.inGrid)
					{

						if (out.direction === dir)
							return true;
					}
				}
				else if (out.direction === nextObject.inGrid)
				{
					return true;
				}
			}
		}
		
		return false;
	}
	
	// Return the out-end points of an object 
	outPos()
	{
		//Stops water if pipe frozen
		// console.log(this);
		if (this.phase_ === WaterPhase.ICE) {
			console.log("Frozen - Catch all");
			return errMsg.FROZEN;
		}
			

		//outpos for SOURCE
		if (this.kind_ == ObjectType.SOURCE)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					return [{
						y: this.position_.y-1,
						x: this.position_.x,
						direction: this.faceDirection_
					}]
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: this.faceDirection_
					}] 
				break;
				case Direction.SOUTH:
					return [{
						y: this.position_.y+1,
						x: this.position_.x,
						direction: this.faceDirection_
					}]
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: this.faceDirection_
					}]
				break;
				default:
					//
			}

			//return[{}]
		}
		//outpos for PIPE
		if (this.kind_ === ObjectType.PIPE)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					if (this.phase_ === WaterPhase.STEAM)
						return [{
							y: this.position_.y-1,
							x: this.position_.x,
							direction: this.faceDirection_
						}];
					else
						return errMsg.WATERUP;
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: this.faceDirection_
					}] 
				break;
				case Direction.SOUTH:
					if (this.phase_ === WaterPhase.WATER){
						return [{
								y: this.position_.y+1,
								x: this.position_.x,
								direction: this.faceDirection_
						}]
					}
					return errMsg.HEATDOWN
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: this.faceDirection_
					}]
				break;
				default:
					//
			}
		}
		//TODO: CHECK IF BENDLEFT AND BENDRIGHT PRODUCE THE CORRECT OUTPOS
		else if (this.kind_ == ObjectType.BENDLEFT)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					if (this.phase_ === WaterPhase.STEAM)
						return [{
							y: this.position_.y-1,
							x: this.position_.x,
							direction: this.faceDirection_
						}]
					else
						return errMsg.WATERUP;
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: this.faceDirection_
					}] 
				break;
				case Direction.SOUTH:
					if (this.phase_ === WaterPhase.WATER)
						return [{
							y: this.position_.y+1,
							x: this.position_.x,
							direction: this.faceDirection_
						}]
					else 
						return errMsg.HEATDOWN;
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: this.faceDirection_
					}]
				break;
				default:
					//
			}
		}
		else if (this.kind_ == ObjectType.BENDRIGHT)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					if (this.phase_ === WaterPhase.STEAM)
						return [{
							y: this.position_.y-1,
							x: this.position_.x,
							direction: this.faceDirection_
						}]
					else
						return errMsg.WATERUP;
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: this.faceDirection_
					}] 
				break;
				case Direction.SOUTH:
					if (this.phase_ === WaterPhase.WATER)
						return [{
							y: this.position_.y+1,
							x: this.position_.x,
							direction: this.faceDirection_
						}]
					else
						return errMsg.HEATDOWN;
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: this.faceDirection_
					}]
				break;
				default:
					//
			}
		}
		else if (this.kind_ == ObjectType.CHECKPIPE)
		{
			console.log(this);
			if (this.purity_ == PurityLevel.CLEAN){
				switch (this.faceDirection_){
					case Direction.NORTH:
						return [{
							y: this.position_.y,
							x: this.position_.x-1,
							direction: Direction.WEST
						}]
					break;
					case Direction.EAST:
						if (this.phase_ === WaterPhase.STEAM) 
							return [{
								y: this.position_.y-1,
								x: this.position_.x,
								direction: Direction.NORTH
							}] 
						else
							return errMsg.WATERUP;
					break;
					case Direction.SOUTH:
						return [{
							y: this.position_.y,
							x: this.position_.x+1,
							direction: Direction.EAST
						}]
					break;
					case Direction.WEST:
						if(this.phase === WaterPhase.WATER)
							return [{
								y: this.position_.y+1,
								x: this.position_.x,
								direction: Direction.SOUTH
							}]
						else
							return errMsg.HEATDOWN;
					break;
					default:
						//
				}
			}else{
				switch (this.faceDirection_){
					case Direction.NORTH:
						return [{
							y: this.position_.y,
							x: this.position_.x+1,
							direction: Direction.EAST
						}]
					break;
					case Direction.EAST:
						if (this.phase_ === WaterPhase.WATER)
							return [{
								y: this.position_.y+1,
								x: this.position_.x,
								direction: Direction.SOUTH
							}] 
						else
							return errMsg.HEATDOWN;
					break;
					case Direction.SOUTH:
						return [{
							y: this.position_.y,
							x: this.position_.x-1,
							direction: Direction.WEST
						}]
					break;
					case Direction.WEST:
						if(this.phase_ === WaterPhase.STEAM)
							return [{
								y: this.position_.y-1,
								x: this.position_.x,
								direction: Direction.NORTH
							}]
						else
							return errMsg.WATERUP;
					break;
					default:
						//
				}

			}
		}
		else if (this.kind_ == ObjectType.DOUBLEDUAL)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: Direction.WEST
					},
					{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: Direction.EAST
					}]
				break;
				case Direction.EAST:
					console.log("EAST")
					if (this.phase_ === WaterPhase.WATER)
						return [
							{
								y: this.position_.y+1,
								x: this.position_.x,
								direction: Direction.SOUTH
							// },
							// errMsg.WATERUP
						}
						]
					else if (this.phase_ === WaterPhase.STEAM){
						return [
							{
								y: this.position_.y-1,
								x: this.position_.x,
								direction: Direction.NORTH
							// },
							// errMsg.HEATDOWN
							}
						]
					}
				break;
				case Direction.SOUTH:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: Direction.WEST
					},
					{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: Direction.EAST
					}]
				break;
				case Direction.WEST:
					if (this.phase_ === WaterPhase.STEAM)
						return [{
							y: this.position_.y-1,
							x: this.position_.x,
							direction: Direction.NORTH
							// },
							// errMsg.HEATDOWN
							}
						]
					else if (this.phase_ === WaterPhase.WATER){
						return [{
							y: this.position_.y+1,
							x: this.position_.x,
							direction: Direction.SOUTH
							// },
							// errMsg.WATERUP
							}
						]
					}
				break;
				default:
					//
			}
		}
		else if (this.kind_ == ObjectType.DOUBLELEFT)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: Direction.WEST
					}]
				break;
				case Direction.EAST:
					if(this.phase_ === WaterPhase.STEAM)
						return [{
							y: this.position_.y-1,
							x: this.position_.x,
							direction: Direction.NORTH
						}]
					else
						return	errMsg.WATERUP;
				break;
				case Direction.SOUTH:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: Direction.EAST
					}]
				break;
				case Direction.WEST:
					if (this.phase_ === WaterPhase.WATER)
						return [{
							y: this.position_.y+1,
							x: this.position_.x,
							direction: Direction.SOUTH
						}]
					else
						return errMsg.HEATDOWN;
				break;
				default:
					//
			}
		}
		else if (this.kind_ == ObjectType.DOUBLERIGHT)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: Direction.EAST
					}]
				break;
				case Direction.EAST:
					if(this.phase_ === WaterPhase.WATER)
						return [{
							y: this.position_.y+1,
							x: this.position_.x,
							direction: Direction.SOUTH
						}] 
					else
						return errMsg.HEATDOWN;
				break;
				case Direction.SOUTH:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: Direction.WEST
					}]
				break;
				case Direction.WEST:
					if(this.phase_ === WaterPhase.STEAM)
						return [{
							y: this.position_.y-1,
							x: this.position_.x,
							direction: Direction.NORTH
						}]
					else
						return errMsg.WATERUP;
				break;
				default:
					//
			}
		}
		else if (this.kind_ == ObjectType.PURIFIER)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					if (this.phase_ === WaterPhase.STEAM)
						return [{
							y: this.position_.y-1,
							x: this.position_.x,
							direction: this.faceDirection_
						}];
					else
						return errMsg.WATERUP;
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: this.faceDirection_
					}] 
				break;
				case Direction.SOUTH:
					if (this.phase_ === WaterPhase.WATER){
						return [{
								y: this.position_.y+1,
								x: this.position_.x,
								direction: this.faceDirection_
						}]
					}
					return errMsg.HEATDOWN
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: this.faceDirection_
					}]
				break;
				default:
					//
			}
		}
		else if (this.kind == ObjectType.FURNACE)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					if (this.phase_ === WaterPhase.STEAM)
						return [{
							y: this.position_.y-1,
							x: this.position_.x,
							direction: this.faceDirection_
						}];
					else
						return errMsg.WATERUP;
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: this.faceDirection_
					}] 
				break;
				case Direction.SOUTH:
					if (this.phase_ === WaterPhase.WATER){
						return [{
								y: this.position_.y+1,
								x: this.position_.x,
								direction: this.faceDirection_
						}]
					}
					return errMsg.HEATDOWN
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: this.faceDirection_
					}]
				break;
				default:
			}
		}
		else if (this.kind == ObjectType.COOLER)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					if (this.phase_ === WaterPhase.STEAM)
						return [{
							y: this.position_.y-1,
							x: this.position_.x,
							direction: this.faceDirection_
						}];
					else
						return errMsg.WATERUP;
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: this.faceDirection_
					}] 
				break;
				case Direction.SOUTH:
					if (this.phase_ === WaterPhase.WATER){
						return [{
								y: this.position_.y+1,
								x: this.position_.x,
								direction: this.faceDirection_
						}]
					}
					return errMsg.HEATDOWN
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: this.faceDirection_
					}]
				break;
				default:
					//
			}
		} 

		if (this.kind_ === ObjectType.TANK)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					if (this.phase_ === WaterPhase.STEAM)
						return [{
							y: this.position_.y-1,
							x: this.position_.x,
							direction: this.faceDirection_
						}];
					else
						return errMsg.WATERUP;
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: this.faceDirection_
					}] 
				break;
				case Direction.SOUTH:
					if (this.phase_ === WaterPhase.WATER){
						return [{
								y: this.position_.y+1,
								x: this.position_.x,
								direction: this.faceDirection_
						}]
					}
					return errMsg.HEATDOWN
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: this.faceDirection_
					}]
				break;
				default:
					//
			}
		}
		
		else if (this.kind_ == ObjectType.FUNCTIONBLOCK)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					if (this.phase_ === WaterPhase.STEAM)
						return [{
							y: this.position_.y-3,
							x: this.position_.x+2,
							direction: this.faceDirection_
						}];
					else
						return errMsg.WATERUP;
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y+2,
						x: this.position_.x+3,
						direction: this.faceDirection_
					}] 
				break;
				case Direction.SOUTH:
					if (this.phase_ === WaterPhase.WATER){
						return [{
								y: this.position_.y+3,
								x: this.position_.x-2,
								direction: this.faceDirection_
						}]
					}
					return errMsg.HEATDOWN
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y-2,
						x: this.position_.x-3,
						direction: this.faceDirection_
					}]
				break;
				default:
					//
			}
		}
		// else if (this.kind_ == ObjectType.FUNCTIONCALL)
		// {
		// 	return [{}]
		// }
		// else if (this.kind_ == ObjectType.FUNCTIONCALL)
		// {
		// 	return [{}]
		// }
		else if (this.kind_ === ObjectType.END){
			console.log("This type is END");
		}
		else {
			console.log("Unrecognised type");
			return [];
		}
			
		
	}
	
	// Decides the direction in which the water will flow into an object
	static getInGrid(type, faceDirection)
	{
		switch (type)
		{
			case ObjectType.PIPE:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.NORTH;
				else if (faceDirection === Direction.SOUTH)
					return Direction.SOUTH;
				else if (faceDirection === Direction.WEST)
					return Direction.WEST;
				else if (faceDirection === Direction.EAST)
					return Direction.EAST;
			}
				break;
			case ObjectType.BENDLEFT:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.EAST;
				else if (faceDirection === Direction.SOUTH)
					return Direction.WEST;
				else if (faceDirection === Direction.WEST)
					return Direction.NORTH;
				else if (faceDirection === Direction.EAST)
					return Direction.SOUTH;
			}
				break;
			case ObjectType.BENDRIGHT:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.WEST;
				else if (faceDirection === Direction.SOUTH)
					return Direction.EAST;
				else if (faceDirection === Direction.WEST)
					return Direction.SOUTH;
				else if (faceDirection === Direction.EAST)
					return Direction.NORTH;
			}
				break;
			case ObjectType.CHECKPIPE:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.NORTH;
				else if (faceDirection === Direction.SOUTH)
					return Direction.SOUTH;
				else if (faceDirection === Direction.WEST)
					return Direction.WEST;
				else if (faceDirection === Direction.EAST)
					return Direction.EAST;
			}
				break;
			case ObjectType.DOUBLEDUAL:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.NORTH;
				else if (faceDirection === Direction.SOUTH)
					return Direction.SOUTH;
				else if (faceDirection === Direction.WEST)
					return Direction.WEST;
				else if (faceDirection === Direction.EAST)
					return Direction.EAST;
			}
				break;
			case ObjectType.DOUBLELEFT:
			{
				if (faceDirection === Direction.NORTH)
					return [Direction.NORTH,Direction.WEST];
				else if (faceDirection === Direction.SOUTH)
					return [Direction.SOUTH,Direction.EAST ];
				else if (faceDirection === Direction.WEST)
					return [Direction.WEST,Direction.SOUTH ];
				else if (faceDirection === Direction.EAST)
					return [Direction.EAST,Direction.NORTH];
			}
				break;
			case ObjectType.DOUBLERIGHT:
			{
				if (faceDirection === Direction.NORTH)
					return [Direction.NORTH,Direction.EAST ];
				else if (faceDirection === Direction.SOUTH)
					return [Direction.SOUTH,Direction.WEST ];
				else if (faceDirection === Direction.WEST)
					return [Direction.WEST,Direction.NORTH ];
				else if (faceDirection === Direction.EAST)
					return [Direction.EAST,Direction.SOUTH];
			}
				break;
			case ObjectType.PURIFIER:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.NORTH;
				else if (faceDirection === Direction.SOUTH)
					return Direction.SOUTH;
				else if (faceDirection === Direction.WEST)
					return Direction.WEST;
				else if (faceDirection === Direction.EAST)
					return Direction.EAST;
			}
				break;
			case ObjectType.FURNACE:
				{
					if (faceDirection === Direction.NORTH)
						return Direction.NORTH;
					else if (faceDirection === Direction.SOUTH)
						return Direction.SOUTH;
					else if (faceDirection === Direction.WEST)
						return Direction.WEST;
					else if (faceDirection === Direction.EAST)
						return Direction.EAST;
				}
					break;
			case ObjectType.COOLER:
				{
					if (faceDirection === Direction.NORTH)
						return Direction.NORTH;
					else if (faceDirection === Direction.SOUTH)
						return Direction.SOUTH;
					else if (faceDirection === Direction.WEST)
						return Direction.WEST;
					else if (faceDirection === Direction.EAST)
						return Direction.EAST;
				}
					break;
			case ObjectType.TANK:
				{
					if (faceDirection === Direction.NORTH)
						return Direction.NORTH;
					else if (faceDirection === Direction.SOUTH)
						return Direction.SOUTH;
					else if (faceDirection === Direction.WEST)
						return Direction.WEST;
					else if (faceDirection === Direction.EAST)
						return Direction.EAST;
				}
					break;

			//Not yet implemented
			case ObjectType.FUNCTIONBLOCK:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.NORTH;
				else if (faceDirection === Direction.SOUTH)
					return Direction.SOUTH;
				else if (faceDirection === Direction.WEST)
					return Direction.WEST;
				else if (faceDirection === Direction.EAST)
					return Direction.EAST;
			}
				break;
			case ObjectType.END:
			{
				return [Direction.NORTH, Direction.SOUTH, Direction.WEST, Direction.EAST];
			}
				break;
			default:
				//console.log("Unrecognised");
	}
}
		
	get position () { return this.position_;}
}

function resetTravereCount(grid)
{
	for (let i = 0; i < grid.length; i++)
		for (let j = 0; j < grid.length; j++)
			if (grid[i][j] instanceof GameEntity)
				grid[i][j].resetTraversed();
}

// Checks if water from the given point reaches to the end CLEAN in all passages that connects the given point to the end
//TODO	check temperature conditions
function simulate(currPos)
{
	var simulate_grid = (runningFunctionBlock ? function_grid : grid);
	console.log(simulate_grid, grid, function_grid, runningFunctionBlock);

	let currObject = simulate_grid[currPos.y][currPos.x];
	let nextPos;
	let nextObject;

	console.log("currPos", currPos);
	console.log("Water is now in", objectName(currObject.kind));
	console.log(currObject);

	// if (currPos.y === 0 && currPos.x === 18){
	// 	console.log("NEW ERROR TRIGGERED")
	// 	return {outcome:false, message:"0 error", err:"18 error"};
	// }
	
	if (currObject.kind == ObjectType.SOURCE)
		resetTravereCount(simulate_grid);

	currObject.increaseTraversed();

	if (currObject.traversed > 20)
	{
		if(!currObject.hasCleanWater)
			return {outcome:false, message:"Dirty water stuck in a loop.", err:"Dirty water stuck in a loop."}
		else
			return {outcome:false, message:"Water is in a loop (" + currPos.x + ", " + currPos.y + ")", err:"Water is in a loop (" + currPos.x + ", " + currPos.y + ")"};
	}

	// Checking if we have reached the destination
	// If it is the end, we return true if the water if clean and false otherwise
	if (currObject.kind === ObjectType.END)
	{
		if (runningFunctionBlock) { // at this point grid is function_grid
			simulate_grid = grid;
			runningFunctionBlock = false;
			console.log("temp_nextPos", temp_nextPos);
			currPos.x = temp_nextPos.x;
			currPos.y = temp_nextPos.y;
			currPos.direction = temp_nextPos.direction;
			currObject.passWater(simulate_grid[currPos.y][currPos.x]);
			currObject = simulate_grid[currPos.y][currPos.x];
			console.log(simulate_grid);
			console.log("currObject in runningfunctionblock", currObject);
			
		} else {
			if (currObject.hasCleanWater)
				return {outcome:true, message:"Clean water is supplied."}
			else
				return {outcome:false, message:"Dirty water is supplied.", err:`ERROR! DIRTY water reaching the end {purity level:${currObject.purity} MUST BE 0.}`}
		}
	}
	
	// Otherwise if it is not the end we try move to the next position(s) connected to by the current object
	const connectedPos = currObject.outPos(); //maybe selecting wrong out

	console.log("connectedPos:", connectedPos);

	if (connectedPos === errMsg.FROZEN) {
		let err = `Water is frozen (` + currPos.x + `, ` + currPos.y + `)`;
		return {outcome:false, message:`Water is frozen.`, err};
	}
	else if (connectedPos === errMsg.HEATDOWN){
		let err = `Steam cannot move down (` + currPos.x + `, ` + currPos.y + `)`;
		return {outcome:false, message:`Steam cannot move down .`, err};
	}
	else if (connectedPos === errMsg.WATERUP){
		let err = `Water cannot flow up (` + currPos.x + `, ` + currPos.y + `)`
		return {outcome:false, message:`Water cannot flow up.`, err};
	}

	let result; 
	
	for (let i = 0; i < connectedPos.length; i++)
	{
		nextPos = connectedPos[i];
		nextObject = simulate_grid[nextPos.y][nextPos.x];
		
		// If the other end connects to nothing it is a loss
		if (nextObject === null)
		{
			let err = `ERROR! The ${directionNames(nextPos.direction).toUpperCase()} out-grid of <${objectName(currObject.kind)} {${currObject.position.x + 1}:${currObject.position.y}}> is OPEN`
			return {outcome:false, message:`Open line. Water is wasted.`, err};
		}
			
		// If an end cannot successfully connect with next object it is a loss 
		if(!currObject.connectsTo(nextObject))
		{
			let err = `ERROR! <${objectName(currObject.kind)} {${currObject.position.x + 1}:${currObject.position.y}}> cannot connet to <${objectName(nextObject.kind)} {${nextObject.position.x + 1}:${nextObject.position.y}}>`
			return {outcome:false, message:"Blocked water passsage.", err}
		}
		
		if (nextObject.kind === ObjectType.FUNCTIONBLOCK){
			runningFunctionBlock = true;

			console.log("nextpos:", nextPos);
			console.log("object at nextpos:", simulate_grid[nextPos.y][nextPos.x]);

			temp_nextPos.x = nextPos.x;
			temp_nextPos.y = nextPos.y;
			temp_nextPos.direction = nextPos.direction;

			
			console.log("temp_nextPos:", temp_nextPos);

			nextPos.y = 7;
			nextPos.x = 6;
			nextPos.direction = Direction.EAST;

			console.log("NEXT POS");
			console.log(function_grid);
			console.log(function_grid[nextPos.y][nextPos.x]);

			nextObject = function_grid[nextPos.y][nextPos.x];
		}

		// Pass water to the next object 
		currObject.passWater(nextObject);

		if(nextObject.kind === ObjectType.TANK){
			console.log("TANK REACHED")
			return {outcome:false, tank:true, tank_x:nextPos.x, tank_y:nextPos.y, message:`Tank reached.`, err:`Tank reached.`};
		}
		
		result = simulate(nextPos);
		
		
		if (!result.outcome)
			return result;
	}
	
	return result;
}
