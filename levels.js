/*
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
	END: 11
}
*/


var LEVELS = {
	numberOFLevels:14,

	"1":{ //Test
		SOURCE:{y:7,x:3},
		END:{y:10,x:11},
		WATER_PURITY_LEVEL:3,
		WATER_PHASE_LEVEL:1,
		IMMOVABLES:[
			
		],
		blueprint: true,
		MOVABLES:[
			{type:ObjectType.PURIFIER,quantity:3},
			{type:ObjectType.PIPE,quantity:10},
			{type:ObjectType.BENDRIGHT,quantity:6},
			{type:ObjectType.BENDLEFT,quantity:6},
			{type:ObjectType.DOUBLELEFT,quantity:3},
			{type:ObjectType.DOUBLERIGHT,quantity:3},
			{type:ObjectType.DOUBLEDUAL,quantity:3},
			{type:ObjectType.FURNACE,quantity:3},
			{type:ObjectType.COOLER,quantity:3},
			{type:ObjectType.TANK,quantity:1},
			{type:ObjectType.CHECKPIPE, quantity:5}
		]
	},

	"15":{ //Tank
		SOURCE:{y:6,x:4},
		END:{y:6,x:10},
		WATER_PURITY_LEVEL:0,
		WATER_PHASE_LEVEL:1,
		IMMOVABLES:[],
		MOVABLES:[
			{type:ObjectType.PIPE,quantity:2},
			{type:ObjectType.TANK,quantity:1}
		]
	},
	
	"111":{ //Water goes down
		SOURCE:{y:3,x:3},
		END:{y:6,x:6},
		WATER_PURITY_LEVEL:0,
		WATER_PHASE_LEVEL:1,
		IMMOVABLES:[
			{type:ObjectType.PIPE, y:3, x:4, direction:Direction.EAST},
			{type:ObjectType.PIPE, y:3, x:5, direction:Direction.EAST},
			{type:ObjectType.PIPE, y:4, x:6, direction:Direction.SOUTH},
			{type:ObjectType.PIPE, y:5, x:6, direction:Direction.SOUTH}
	 ],
		MOVABLES:[
			{type:ObjectType.BENDRIGHT,quantity:1},
			{type:ObjectType.BENDLEFT,quantity:1}
		]
	},
	"2":{ //Steam goes up
		SOURCE:{y:6,x:3},
		END:{y:3,x:6},
		WATER_PURITY_LEVEL:0,
		WATER_PHASE_LEVEL:2,
		IMMOVABLES:[
			{type:ObjectType.PIPE, y:6, x:4, direction:Direction.EAST},
			{type:ObjectType.PIPE, y:6, x:5, direction:Direction.EAST},
			{type:ObjectType.PIPE, y:4, x:6, direction:Direction.NORTH},
			{type:ObjectType.PIPE, y:5, x:6, direction:Direction.NORTH}
	 ],
		MOVABLES:[
			{type:ObjectType.BENDRIGHT,quantity:1},
			{type:ObjectType.BENDLEFT,quantity:1}
		]
	},
	"3":{ //Choose up or down 1
		SOURCE:{y:6,x:3},
		END:{y:3,x:6},
		END2:{y:9,x:6},
		WATER_PURITY_LEVEL:0,
		WATER_PHASE_LEVEL:1,
		IMMOVABLES:[
			{type:ObjectType.PIPE, y:6, x:4, direction:Direction.EAST},
			{type:ObjectType.PIPE, y:6, x:5, direction:Direction.EAST},
			{type:ObjectType.PIPE, y:4, x:6, direction:Direction.NORTH},
			{type:ObjectType.PIPE, y:5, x:6, direction:Direction.NORTH},
			{type:ObjectType.PIPE, y:7, x:6, direction:Direction.SOUTH},
			{type:ObjectType.PIPE, y:8, x:6, direction:Direction.SOUTH}
	 ],
		MOVABLES:[
			{type:ObjectType.BENDRIGHT,quantity:1},
			{type:ObjectType.BENDLEFT,quantity:1}
		]
	},
	"4":{ //Choose up or down 2
		SOURCE:{y:6,x:3},
		END:{y:3,x:6},
		END2:{y:9,x:6},
		WATER_PURITY_LEVEL:0,
		WATER_PHASE_LEVEL:2,
		IMMOVABLES:[
			{type:ObjectType.PIPE, y:6, x:4, direction:Direction.EAST},
			{type:ObjectType.PIPE, y:6, x:5, direction:Direction.EAST},
			{type:ObjectType.PIPE, y:4, x:6, direction:Direction.NORTH},
			{type:ObjectType.PIPE, y:5, x:6, direction:Direction.NORTH},
			{type:ObjectType.PIPE, y:7, x:6, direction:Direction.SOUTH},
			{type:ObjectType.PIPE, y:8, x:6, direction:Direction.SOUTH}
	 ],
		MOVABLES:[
			{type:ObjectType.BENDRIGHT,quantity:1},
			{type:ObjectType.BENDLEFT,quantity:1}
		]
	},
	"5":{ //Cooler
		SOURCE:{y:3,x:3},
		END:{y:6,x:6},
		WATER_PURITY_LEVEL:0,
		WATER_PHASE_LEVEL:2,
		IMMOVABLES:[
			{type:ObjectType.BENDRIGHT, y:3, x:6, direction:Direction.SOUTH}
	 ],
		MOVABLES:[
			{type:ObjectType.PIPE,quantity:4},
			{type:ObjectType.COOLER,quantity:1}
		]
	},
	"6":{ //Heater
		SOURCE:{y:6,x:3},
		END:{y:3,x:6},
		WATER_PURITY_LEVEL:0,
		WATER_PHASE_LEVEL:1,
		IMMOVABLES:[
			{type:ObjectType.BENDLEFT, y:6, x:6, direction:Direction.NORTH}
	 ],
		MOVABLES:[
			{type:ObjectType.PIPE,quantity:4},
			{type:ObjectType.FURNACE,quantity:1}
		]
	},
	"7":{ //Water Filter
		SOURCE:{y:3,x:3},
		END:{y:3,x:8},
		WATER_PURITY_LEVEL:1,
		WATER_PHASE_LEVEL:1,
		IMMOVABLES:[],
		MOVABLES:[
			{type:ObjectType.PIPE,quantity:4},
			{type:ObjectType.PURIFIER,quantity:1}
		]
	},
	"8":{ //Filter - Steam
		SOURCE:{y:5,x:3},
		END:{y:2,x:8},
		WATER_PURITY_LEVEL:1,
		WATER_PHASE_LEVEL:2,
		IMMOVABLES:[],
		MOVABLES:[
			{type:ObjectType.PIPE,quantity:6},
			{type:ObjectType.PURIFIER,quantity:1},
			{type:ObjectType.BENDLEFT, quantity:1},
			{type:ObjectType.BENDRIGHT, quantity:1}
		]
	},
	"9":{ //Filter 2 - Steam
		SOURCE:{y:5,x:3},
		END:{y:2,x:8},
		WATER_PURITY_LEVEL:2,
		WATER_PHASE_LEVEL:2,
		IMMOVABLES:[],
		MOVABLES:[
			{type:ObjectType.PIPE,quantity:6},
			{type:ObjectType.PURIFIER,quantity:2},
			{type:ObjectType.BENDLEFT, quantity:1},
			{type:ObjectType.BENDRIGHT, quantity:1}
		]
	},
	"10":{
		SOURCE:{y:10,x:3},
		END:{y:10,x:12},
		WATER_PURITY_LEVEL:1,
		WATER_PHASE_LEVEL:1,
		IMMOVABLES:[
			{type:ObjectType.BENDLEFT, y:10, x:6, direction:Direction.NORTH},
			{type:ObjectType.BENDRIGHT, y:8, x:6, direction:Direction.EAST},
			{type:ObjectType.BENDRIGHT, y:8, x:9, direction:Direction.SOUTH},
			{type:ObjectType.BENDLEFT, y:10, x:9, direction:Direction.EAST},
		],
		MOVABLES:[
			{type:ObjectType.PURIFIER,quantity:1},
			{type:ObjectType.FURNACE,quantity:1},
			{type:ObjectType.COOLER,quantity:1},
			{type:ObjectType.PIPE,quantity:7},
		]
	},
	"11":{ //Loops
		SOURCE:{y:8,x:8},
		END:{y:5,x:9},
		WATER_PURITY_LEVEL:3,
		WATER_PHASE_LEVEL:1,
		IMMOVABLES:[
			
		],
		MOVABLES:[
			{type:ObjectType.PURIFIER,quantity:3},
			{type:ObjectType.PIPE,quantity:20},
			{type:ObjectType.BENDRIGHT,quantity:4},
			{type:ObjectType.FURNACE,quantity:1}
		]
	},
	"12":{ //Loops
		SOURCE:{y:7,x:3},
		END:{y:10,x:11},
		WATER_PURITY_LEVEL:3,
		WATER_PHASE_LEVEL:1,
		IMMOVABLES:[
			{type:ObjectType.CHECKPIPE, y: 7, x:10, direction: Direction.SOUTH},
			{type:ObjectType.BENDLEFT, y: 7, x:6, direction: Direction.NORTH},
			{type:ObjectType.BENDRIGHT, y: 6, x:6, direction: Direction.EAST},
			{type:ObjectType.DOUBLERIGHT, y: 6, x:7, direction: Direction.NORTH},
			{type:ObjectType.BENDRIGHT, y: 7, x:7, direction: Direction.NORTH},
			{type:ObjectType.BENDRIGHT, y: 6, x:10, direction: Direction.SOUTH},
			{type:ObjectType.BENDRIGHT, y: 7, x:11, direction: Direction.SOUTH},
			{type:ObjectType.PIPE, y: 8, x:11, direction: Direction.SOUTH},
			{type:ObjectType.PIPE, y: 9, x:11, direction: Direction.SOUTH},
		],	
		MOVABLES:[
			{type:ObjectType.PURIFIER,quantity:1},
			{type:ObjectType.PIPE,quantity:5},
			{type:ObjectType.FURNACE,quantity:2},
			{type:ObjectType.COOLER,quantity:1}
		]
	},
	"13":{ //Loops 2
		SOURCE:{y:7,x:3},
		END:{y:10,x:11},
		WATER_PURITY_LEVEL:3,
		WATER_PHASE_LEVEL:2,
		IMMOVABLES:[
			{type:ObjectType.CHECKPIPE, y: 7, x:10, direction: Direction.NORTH},
		],	
		MOVABLES:[
			{type:ObjectType.PURIFIER,quantity:1},
			{type:ObjectType.PIPE,quantity:50},
			{type:ObjectType.FURNACE,quantity:5},
			{type:ObjectType.COOLER,quantity:5},
			{type:ObjectType.DOUBLERIGHT,quantity:1},
			{type:ObjectType.DOUBLELEFT,quantity:50},
			{type:ObjectType.BENDRIGHT,quantity:50},
			{type:ObjectType.BENDLEFT,quantity:50},
		]
	},
	"Function":{ //function grid
		SOURCE:{y:7,x:5},
		END:{y:10,x:10},
		WATER_PURITY_LEVEL:0,
		WATER_PHASE_LEVEL:1,
		IMMOVABLES:[],
		MOVABLES:[]
	},
	// "10":{ //Basic level
	// 	SOURCE:{y:3,x:3},
	// 	END:{y:6,x:6},
	// 	WATER_PURITY_LEVEL:0,
	// 	WATER_PHASE_LEVEL: 1,
	// 	IMMOVABLES:[],
	// 	MOVABLES:[
	// 		{type:ObjectType.PIPE,quantity:5},
	// 		{type:ObjectType.BENDRIGHT,quantity:2},
	// 		{type:ObjectType.BENDLEFT,quantity:2},
	// 	]
	// },
	// "2":{ //Furnace level
	// 	SOURCE:{y:8,x:5},
	// 	END:{y:4,x:8},
	// 	WATER_PURITY_LEVEL:0,
	// 	WATER_PHASE_LEVEL: 1,
	// 	IMMOVABLES:[],
	// 	MOVABLES:[
	// 		{type:ObjectType.FURNACE,quantity:1},
	// 		{type:ObjectType.PIPE,quantity:7},
	// 		{type:ObjectType.BENDRIGHT,quantity:4},
	// 		{type:ObjectType.BENDLEFT,quantity:4},
	// 	]
	
	// },
	// "3":{ //Cooler level
	// 	SOURCE:{y:5,x:5},
	// 	END:{y:9,x:8},
	// 	WATER_PURITY_LEVEL:0,
	// 	WATER_PHASE_LEVEL: 2,
	// 	IMMOVABLES:[],
	// 	MOVABLES:[
	// 		{type:ObjectType.COOLER,quantity:2},
	// 		{type:ObjectType.PIPE,quantity:7},
	// 		{type:ObjectType.BENDRIGHT,quantity:4},
	// 		{type:ObjectType.BENDLEFT,quantity:4},
	// 	]
	// },
	// "4":{ //Purify level
	// 	SOURCE:{y:5,x:5},
	// 	END:{y:9,x:8},
	// 	WATER_PURITY_LEVEL:2,
	// 	WATER_PHASE_LEVEL: 2,
	// 	IMMOVABLES:[],
	// 	MOVABLES:[
	// 		{type:ObjectType.PURIFIER,quantity:2},
	// 		{type:ObjectType.COOLER,quantity:1},
	// 		{type:ObjectType.PIPE,quantity:7},
	// 		{type:ObjectType.BENDRIGHT,quantity:4},
	// 		{type:ObjectType.BENDLEFT,quantity:4},
	// 	]
	// },
	// "5":{ //Loops
	// 	SOURCE:{y:7,x:3},
	// 	END:{y:10,x:11},
	// 	WATER_PURITY_LEVEL:3,
	// 	WATER_PHASE_LEVEL:1,
	// 	IMMOVABLES:[
	// 		{type:ObjectType.CHECKPIPE, y: 7, x:10, direction: Direction.SOUTH}
	// 	],
	// 	MOVABLES:[
	// 		{type:ObjectType.PURIFIER,quantity:1},
	// 		{type:ObjectType.PIPE,quantity:10},
	// 		{type:ObjectType.BENDRIGHT,quantity:6},
	// 		{type:ObjectType.BENDLEFT,quantity:6},
	// 		{type:ObjectType.DOUBLELEFT,quantity:1},
	// 		{type:ObjectType.DOUBLERIGHT,quantity:1},
	// 		{type:ObjectType.DOUBLEDUAL,quantity:1},
	// 		{type:ObjectType.FURNACE,quantity:3},
	// 		{type:ObjectType.COOLER,quantity:3}
	// 	]
	// }
	// "6":{ // Storage level
	// 	SOURCE:{y:7,x:7}, 
	// 	END:{y:7,x:12},
	// 	WATER_PURITY_LEVEL:0,
	// 	WATER_PHASE_LEVEL: 1,
	// 	IMMOVABLES:[],
	// 	MOVABLES:[
	// 		{type:ObjectType.PIPE,quantity:10}
	// 	]
	
	// }
}
