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
	numberOFLevels:5,
	// "1":{
	// 	SOURCE:{y:3,x:3},
	// 	END:{y:6,x:6},
	// 	WATER_PURITY_LEVEL:1,
	// 	WATER_PHASE_LEVEL:1,
	// 	IMMOVABLES:[],
	// 	MOVABLES:[
	// 		{type:ObjectType.PURIFIER,quantity:2},
	// 		{type:ObjectType.FURNACE,quantity:5},
	// 		{type:ObjectType.COOLER,quantity:5},
	// 		{type:ObjectType.PIPE,quantity:5},
	// 		{type:ObjectType.BENDRIGHT,quantity:5},
	// 		{type:ObjectType.BENDLEFT,quantity:5},
	// 		{type:ObjectType.DOUBLELEFT,quantity:1},
	// 		{type:ObjectType.DOUBLERIGHT,quantity:1},
	// 		{type:ObjectType.DOUBLEDUAL,quantity:1},
	// 		{type:ObjectType.CHECKPIPE, quantity:1}
	// 	]
	// },
	"1":{ //Basic level
		SOURCE:{y:3,x:3},
		END:{y:6,x:6},
		WATER_PURITY_LEVEL:0,
		WATER_PHASE_LEVEL: 1,
		IMMOVABLES:[],
		MOVABLES:[
			{type:ObjectType.PIPE,quantity:5},
			{type:ObjectType.BENDRIGHT,quantity:2},
			{type:ObjectType.BENDLEFT,quantity:2},
		]
	},
	"2":{ //Furnace level
		SOURCE:{y:8,x:5},
		END:{y:4,x:8},
		WATER_PURITY_LEVEL:0,
		WATER_PHASE_LEVEL: 1,
		IMMOVABLES:[],
		MOVABLES:[
			{type:ObjectType.FURNACE,quantity:1},
			{type:ObjectType.PIPE,quantity:7},
			{type:ObjectType.BENDRIGHT,quantity:4},
			{type:ObjectType.BENDLEFT,quantity:4},
		]
	
	},
	"3":{ //Cooler level
		SOURCE:{y:5,x:5},
		END:{y:9,x:8},
		WATER_PURITY_LEVEL:0,
		WATER_PHASE_LEVEL: 2,
		IMMOVABLES:[],
		MOVABLES:[
			{type:ObjectType.COOLER,quantity:2},
			{type:ObjectType.PIPE,quantity:7},
			{type:ObjectType.BENDRIGHT,quantity:4},
			{type:ObjectType.BENDLEFT,quantity:4},
		]
	},
	"4":{ //Purify level
		SOURCE:{y:5,x:5},
		END:{y:9,x:8},
		WATER_PURITY_LEVEL:2,
		WATER_PHASE_LEVEL: 2,
		IMMOVABLES:[],
		MOVABLES:[
			{type:ObjectType.PURIFIER,quantity:2},
			{type:ObjectType.COOLER,quantity:1},
			{type:ObjectType.PIPE,quantity:7},
			{type:ObjectType.BENDRIGHT,quantity:4},
			{type:ObjectType.BENDLEFT,quantity:4},
		]
	},
	"5":{ //Loops
		SOURCE:{y:7,x:3},
		END:{y:10,x:11},
		WATER_PURITY_LEVEL:3,
		WATER_PHASE_LEVEL:1,
		IMMOVABLES:[
			{type:ObjectType.CHECKPIPE, y: 7, x:10, direction: Direction.SOUTH}
		],
		MOVABLES:[
			{type:ObjectType.PURIFIER,quantity:1},
			{type:ObjectType.PIPE,quantity:10},
			{type:ObjectType.BENDRIGHT,quantity:6},
			{type:ObjectType.BENDLEFT,quantity:6},
			{type:ObjectType.DOUBLELEFT,quantity:1},
			{type:ObjectType.DOUBLERIGHT,quantity:1},
			{type:ObjectType.DOUBLEDUAL,quantity:1},
			{type:ObjectType.FURNACE,quantity:3},
			{type:ObjectType.COOLER,quantity:3}
		]
	}
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
