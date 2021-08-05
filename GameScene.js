var grid = create_grid();
var function_grid;
var temp_grid;
var TEMP_CURRENT_LEVEL;
// var function_grid = create_grid();
var start_x;
var start_y;
var tank_sprite;
var pipedUsed = 0;
// timestamps.
var d;
var text;
var timedEvent;
var lapTime;

//Functions
var inFunction = false;

function formatTime(seconds) {
    // Minutes
    var minutes = Math.floor(seconds / 60);
    // Seconds
    var partInSeconds = seconds % 60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2, '0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}
function onEvent() {
    if (this.initialTime > 0) {
        this.initialTime -= 1; // One second
        text.setText('Countdown: ' + formatTime(this.initialTime));
    }
}

class GameScene extends Phaser.Scene {

    OFFSET = 21.875;
    CELL_WIDTH = 43.75;
    RIGHTEDGE = 743.75;

    constructor(){
        super('GameScene');
    }

    preload (){
        this.load.image('board', 'assets/grid.png');
        this.load.image('run', 'assets/run.png');
        this.load.image('redo', 'assets/redo.png');
        this.load.image('info', 'assets/info.png');
        this.load.image('HowTo', 'assets/HowTo.png');
        this.load.image('bin', 'assets/trash.png')

        this.load.image('SOURCE', 'assets/start.png');
        this.load.image('END', 'assets/end.png');

        this.load.image('PIPE', 'assets/pipe.png');
        this.load.image('BENDLEFT', 'assets/bend_left.png');
        this.load.image('BENDRIGHT', 'assets/bend_right.png');
        this.load.image('CHECKPIPE', 'assets/checkerpipe_clean.png');
        this.load.image('DOUBLEDUAL', 'assets/doublepipe_dual.png');
        this.load.image('DOUBLELEFT', 'assets/doublepipe_left.png');
        this.load.image('DOUBLERIGHT', 'assets/doublepipe_right.png');
        this.load.image('PURIFIER', 'assets/purify.png');
        this.load.image('FURNACE', 'assets/furnace.png')
        this.load.image('COOLER', 'assets/cooler.png')
        this.load.image('TANK', 'assets/storage_tank.png')

        this.load.image('WATER', 'assets/water.png')
        this.load.image('POOP', 'assets/poop.png')
        this.load.image('ARROW', 'assets/arrow.png')
        this.load.image('STEAM', 'assets/steam.png')
        this.load.image('BRICK', 'assets/brick.jpg')
        
        this.load.image('FUNCTIONBLOCK', 'assets/function.png');
        this.load.image('FUNCTIONCALL', 'assets/functioncall.png');
        this.load.image('SAVE', 'assets/save_icon.png');
        //console.log("GameScene starts");
    }
        
    create(){
        //grid background
    //grid = create_grid(); // creates a 2D array of 16x16
    this.add.image(OFFSET, OFFSET+CELL_WIDTH, 'board').setOrigin(0,0); //set the origin of the image to the top-left and add the image to the scene
    this.scene.launch('GameInfoScene');

    //level generation
    // console.log(grid);
    generateLevel(this, CURRENT_LEVEL);

    //run button
    var runBtn = this.add.image(RIGHTEDGE-CELL_WIDTH - 20,OFFSET, 'run').setOrigin(0,0);
    runBtn.setInteractive();
    runBtn.setScale(0.14);

    //redo button
    var redoBtn = this.add.image(RIGHTEDGE-CELL_WIDTH + 25,OFFSET*34, 'redo').setOrigin(0,0);
    redoBtn.setInteractive();
    redoBtn.setScale(0.08);

    //info button
    var infoBtn = this.add.image(RIGHTEDGE-CELL_WIDTH + 25, OFFSET*3, 'info').setOrigin(0,0);
    infoBtn.setInteractive();
    infoBtn.setScale(2);

    //bin button
    var binBtn = this.add.image(RIGHTEDGE-CELL_WIDTH*3-OFFSET, OFFSET, 'bin').setOrigin(0,0);
    binBtn.setInteractive();
    binBtn.setScale(0.05);

    //Function button
    var functionBtn = this.add.image(RIGHTEDGE-CELL_WIDTH*3-OFFSET*3.5, OFFSET-2, 'FUNCTIONCALL').setOrigin(0,0);
    functionBtn.setInteractive();
    functionBtn.setScale(0.3);

    var saveBtn;

  

    // var saveBtn = this.add.image(RIGHTEDGE-CELL_WIDTH*3-OFFSET*3.5, OFFSET-2, 'SAVE').setOrigin(0,0);
    // saveBtn.setInteractive();
    // saveBtn.setScale(0.3);
    // saveBtn.setVisible(false);

    //How to
    var howTo = this.add.image(0, 0, 'HowTo').setOrigin(0,0).setVisible(false);

    var previous_position; // previous position of game object in pixels
    var previous_x; // previous x position of game object in the 2D array
    var previous_y; // previous y position of game object in the 2D array
    var drag_triggered = false;
    
    this.input.on('dragstart', function (pointer, gameObject, dropZone){
        drag_triggered = true;
        //sets the starting grid block to null
        //save the previous position in case the user drags the object to an occupied grid cell
        previous_position = [gameObject.x, gameObject.y];
        previous_x = (gameObject.x/CELL_WIDTH)-1;
        previous_y = (gameObject.y/CELL_WIDTH)-1;
        console.log(getKind(gameObject));
        console.log("x:" + previous_x);
        console.log("y:" + previous_y);
        console.log(ObjectType.FUNCTIONBLOCK);
        if(getKind(gameObject) === ObjectType.FUNCTIONBLOCK && previous_y != 0){
            console.log("HELLO");
            grid[previous_y-1][previous_x] = null;
            grid[previous_y-1][previous_x+1] = null;
            grid[previous_y+1][previous_x] = null;
            grid[previous_y+1][previous_x+1] = null;
            grid[previous_y][previous_x+1] = null;
            grid[previous_y][previous_x-1] = null;
            grid[previous_y+1][previous_x-1] = null;
            grid[previous_y-1][previous_x-1] = null;
        }

        gameObject.angle += 90;
        grid[previous_y][previous_x] = null;
        
    });
    
    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
        gameObject.x = Phaser.Math.Snap.To(dragX, CELL_WIDTH);
        gameObject.y = Phaser.Math.Snap.To(dragY, CELL_WIDTH);
    });
 
    this.input.on('dragend', function(pointer, gameObject, dropZone) {

          // did change already?
          var objectOut = JSON.parse(localStorage.getItem('timestamps'));
          var resultTS = objectOut[0].Boolean;

          if (resultTS == false){
              switch (CURRENT_LEVEL) {

                  case 0:
                      saveToLocal('L1FirstMove');
                      break;
                  case 1:
                      saveToLocal('L2FirstMove');
                      break;
                  case 2:
                      saveToLocal('L3FirstMove');
                      break;
                  case 3:
                      saveToLocal('L4FirstMove');
                      break;
                  case 4:
                      saveToLocal('L5FirstMove');
                      break;
                  case 5:
                      saveToLocal('L6FirstMove');
                      break;
                  case 6:
                      saveToLocal('L7FirstMove');
                      break;
                  default:
              }
              saveToLocal('hasMoved');              
              console.log(localStorage);
          }

          // var seconds = (endDate.getTime() - ts_One.getTime()) / 1000;
          //  console.log("Difference:" + seconds + " seconds");

        drag_triggered = false;
        let x = (gameObject.x/CELL_WIDTH)-1;
        let y = (gameObject.y/CELL_WIDTH)-1;
        let prev_y = (previous_position[1]/CELL_WIDTH)-1;
        let kind = getKind(gameObject);
        let direction = getDirection(gameObject.angle);
        console.log("GAME OBJECT Y IS: ",gameObject.y);
     

        // x:13 y:0
        if (y === 0 || gameObject.x < CELL_WIDTH || gameObject.x > 700 || gameObject.y > 750){
            
            //Check if object is being deleted
            if (x === 13 && y === 0) {
                console.log("ITEM BINNED");
                // gameObject.disableInteractive();
                // gameObject.setVisible(false);
                if(prev_y != 0){
                    console.log(gameObject);
                    AVAILABLE_OBJECTS[kind] += 1;
                };
                
                // TODO: Add sprite or something... this.scene
                create_sprites(this.scene, 1, kind);
                gameObject.destroy();
            } else {
                gameObject.x = previous_position[0];    // WHY?
                gameObject.y = previous_position[1];
                grid[previous_y][previous_x] = new GameEntity(kind, 1, 1, direction, {y: y, x: x});
            };
            
        }else if (grid[y][x] != null){  // something already exists there
            //returns the pipe to its previous position
            gameObject.x = previous_position[0];
            gameObject.y = previous_position[1];
            //console.log(previous_x, previous_y);
            grid[previous_y][previous_x] = new GameEntity(kind, 1, 1, direction, {y: y, x: x});
        }else{ // placeable grid location
            //sets the new grid position as true (i.e. occupied)
            grid[y][x] = new GameEntity(kind, 1, 1, direction, {y: y, x: x});
            console.log("y  : " + y);
            console.log("x: " + x);
            console.log(kind);
            if(kind === ObjectType.FUNCTIONBLOCK){ //TODO figure out wtf is happening
                console.log("FUntionssss");
                grid[y-1][x] = -1;
                grid[y-1][x+1] = -1;
                grid[y+1][x] = -1;
                grid[y+1][x+1] = -1;
                grid[y][x+1] = -1;
                grid[y][x-1] = -1;
                grid[y+1][x-1] = -1;
                grid[y-1][x-1] = -1;
            }
            if (previous_y === 0){
                AVAILABLE_OBJECTS[kind] -= 1;
                pipedUsed +=1;
                
                console.log(AVAILABLE_OBJECTS)
            }

            // // on release of block the source block temp goes up
            // console.log(grid[3][3]);

            // let temp = grid[3][3].phase;
            // console.log("Current temp: " + temp);
            // //currObject.
            
        } 
        // let result = simulate(grid, {y: start_y, x: start_x});
        // console.log(result.message)
        // update_text(result);
        update_text(true);
    });
    
    this.input.on('gameobjectdown', function(pointer, gameObject){
        //rotates the pipe 90 degrees on click
        //FIX: the game rotates the object when the user drags, 
        if (gameObject.texture.key === 'info'){
            console.log("INFO CLICKED")
            howTo.setVisible(true)
            howTo.setInteractive();
            this.scene.sendToBack('GameInfoScene');
        }else if (gameObject.texture.key === 'HowTo'){
            //hide splash
            howTo.disableInteractive();
            howTo.setVisible(false);
        }
        else if (gameObject.texture.key === 'FUNCTIONCALL') {
            // console.log(functionBtn);
            // functionBtn.destroy();
            // saveBtn = this.add.image(RIGHTEDGE-CELL_WIDTH*3-OFFSET*3.5, OFFSET-2, 'SAVE').setOrigin(0,0);
            // saveBtn.setInteractive();
            // saveBtn.setScale(0.3);
            
            if(!inFunction){
                functionBtn.setTexture("FUNCTIONCALL");
                console.log("Function call: true");
                temp_grid = grid;
                console.log("Temp_grid:");
                console.log(temp_grid);

                grid = create_grid();

                TEMP_CURRENT_LEVEL = CURRENT_LEVEL;
                CURRENT_LEVEL = "Function";

                this.registry.destroy(); // TODO somehow save registry?
                this.events.off(); // disable all active events why?
                this.scene.restart('GameScene'); 

                inFunction = true;
            } 
            else {
                let result = simulate(grid, {y: start_y, x: start_x});

                if (result.outcome) {
                // if (true) {

                    functionBtn.setTexture("SAVE");
                    console.log("Function call: false");

                    //SAVE FUNCTION GRID
                    function_grid = grid;
                    console.log("Function_grid: ")
                    console.log(function_grid);

                    // Revert to level
                    CURRENT_LEVEL = TEMP_CURRENT_LEVEL;
                    grid = temp_grid;
                    console.log("Grid:")
                    console.log(grid);
                
                    // TODO update amount values
                    
                    // TODO play around with these
                    this.registry.destroy(); // destroy registry
                    this.events.off(); // disable all active events
                    this.scene.restart('GameScene'); // restart current scene

                    inFunction = false;
                }

                alert(result.message);
            }
            
        }
        // else if (gameObject.texture.key === 'SAVE'){
        //     saveBtn.destroy();
        //     functionBtn = this.add.image(RIGHTEDGE-CELL_WIDTH*3-OFFSET*3.5, OFFSET-2, 'FUNCTIONCALL').setOrigin(0,0);
        //     functionBtn.setInteractive();
        //     functionBtn.setScale(0.3);
        // }
        else if (gameObject.texture.key === 'run'){
            let result = simulate(grid, {y: start_y, x: start_x});
            if (result.outcome && CURRENT_LEVEL === LEVELS.numberOFLevels-1){
            this.scene.start('WinScene');
            }else if (result.outcome && !inFunction){
                switch (CURRENT_LEVEL) {
                    case 0:
                        saveToLocal('L1Complete', 0);
                        saveToLocal('L1PipesUsed', pipedUsed);
                        break;
                    case 1:
                        saveToLocal('L2Complete', 0);
                        saveToLocal('L2PipesUsed', pipedUsed);
                        break;
                    case 2:
                        saveToLocal('L3Complete', 0);
                        saveToLocal('L3PipesUsed', pipedUsed);
                        break;
                    case 3:
                        saveToLocal('L4Complete', 0);
                        saveToLocal('L4PipesUsed', pipedUsed);
                        break;
                    case 4:
                        saveToLocal('L5Complete', 0);
                        saveToLocal('L5PipesUsed', pipedUsed);
                        break;
                    case 5:
                        saveToLocal('L6Complete', 0);
                        saveToLocal('L6PipesUsed', pipedUsed);
                        break;
                    case 6:
                        saveToLocal('L7Complete', 0);
                        saveToLocal('L7PipesUsed', pipedUsed);
                        break;
                    default:
                        break;
                }
                pipedUsed = 0 ;
                saveToLocal('hasMoved', 0);
                console.log(localStorage);
                

                //move on to the next level
                CURRENT_LEVEL ++;
                //do some fancy animation
                //restart scene
                update_text(result);
                grid = create_grid();
                this.registry.destroy(); // destroy registry
                this.events.off(); // disable all active events
                this.scene.restart('GameScene'); // restart current scene
            }
            else if (result.tank) {
                start_x = result.tank_x;
                start_y = result.tank_y;
                
                this.input.setDraggable(tank_sprite, false);
            }
            alert(result.message);
        }else if (gameObject.texture.key === 'redo'){
            pipedUsed = 0;
                switch (CURRENT_LEVEL) {
                    case 0:
                        saveToLocal('L1RedoCount', 0);
                        break;
                    case 1:
                        saveToLocal('L2RedoCount', 0);
                        break;
                    case 2:
                        saveToLocal('L3RedoCount', 0);
                        break;
                    case 3:
                        saveToLocal('L4RedoCount', 0);
                        break;
                    case 4:
                        saveToLocal('L5RedoCount', 0);
                        break;
                    case 5:
                        saveToLocal('L6RedoCount', 0);
                        break;
                    case 6:
                        saveToLocal('L7RedoCount', 0);
                        break;
                    default:
                        break;
                }
            //redo current level
            grid = create_grid();
            pipedUsed = 0;
            this.registry.destroy(); // destroy registry
            this.events.off(); // disable all active events
            this.scene.restart(); // restart current scene           
        };
        
         
    }, this);

    }

}



function create_grid(){
    var grid = new Array(17);
    var grid_width = 16;
 
    for (var i = 0; i < grid.length; i++){
        grid[i] = new Array(16);
    }

    // makes all elements null, makes first row elements true
    for (var i = 0; i < grid.length; i++){
        for (var j = 0; j < grid_width; j++){
            if (i === 0){
                grid[i][j] = true;
            }else{
                grid[i][j] = null;
            }
            
        }
    }
 
    //NOTE: grid[y][x] - WHY?????????
    return grid;
}



function create_sprites(context, number, type) {
    //generates sprites givent the number of sprites needed and the type of sprite needed
    switch(type) {
        case ObjectType.PIPE:
            for (var i = 0; i < number; i++){
                var pipe = context.add.sprite(CELL_WIDTH*ObjectType.PIPE, CELL_WIDTH, 'PIPE').setInteractive();
                pipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(pipe);
                pipe.angle -= 90;
                //partsGroup.add(pipe);
            }
            break;
        case ObjectType.BENDLEFT:
            for (var i = 0; i < number; i++){
                var bend_left = context.add.sprite(CELL_WIDTH*2, CELL_WIDTH, 'BENDLEFT').setInteractive();
                bend_left.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(bend_left);
                //partsGroup.add(bend_left);
                bend_left.angle += 180;
            }
            break;
        case ObjectType.BENDRIGHT:
            for (var i = 0; i < number; i++){
                var bend_right = context.add.sprite(CELL_WIDTH*3, CELL_WIDTH, 'BENDRIGHT').setInteractive();
                bend_right.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(bend_right);
                //partsGroup.add(bend_right);
            }
            break;
        case ObjectType.CHECKPIPE:
            for (var i = 0; i < number; i++){
                var check_pipe = context.add.sprite(CELL_WIDTH*4, CELL_WIDTH, 'CHECKPIPE').setInteractive();
                check_pipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(check_pipe);
                //partsGroup.add(check_pipe);
            }
            break;
        case ObjectType.DOUBLEDUAL:
            for (var i = 0; i < number; i++){
                var double_pipe_dual = context.add.sprite(CELL_WIDTH*5, CELL_WIDTH, 'DOUBLEDUAL').setInteractive();
                double_pipe_dual.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(double_pipe_dual);
                //partsGroup.add(double_pipe_dual);
            }
            break;
        case ObjectType.DOUBLELEFT:
            for (var i = 0; i < number; i++){
                var double_pipe_left = context.add.sprite(CELL_WIDTH*6, CELL_WIDTH, 'DOUBLELEFT').setInteractive();
                double_pipe_left.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(double_pipe_left);
                //partsGroup.add(double_pipe_left);
            }
            break;
        case ObjectType.DOUBLERIGHT:
            for (var i = 0; i < number; i++){
                var double_pipe_right = context.add.sprite(CELL_WIDTH*7, CELL_WIDTH, 'DOUBLERIGHT').setInteractive();
                double_pipe_right.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(double_pipe_right);
                //partsGroup.add(double_pipe_right);
            }
            break;
        case ObjectType.PURIFIER:
            for (var i = 0; i < number; i++){
                var purifier = context.add.sprite(CELL_WIDTH*8, CELL_WIDTH, 'PURIFIER').setInteractive();
                purifier.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(purifier);
                //partsGroup.add(purifier);
            }
            break;
        case ObjectType.FURNACE:
            for (var i = 0; i < number; i++){
                var furnace = context.add.sprite(CELL_WIDTH*9, CELL_WIDTH, 'FURNACE').setInteractive();
                furnace.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(furnace);
                //partsGroup.add(furnace);
            }
            break;
        case ObjectType.COOLER:
            for (var i = 0; i < number; i++){
                var cooler = context.add.sprite(CELL_WIDTH*10, CELL_WIDTH, 'COOLER').setInteractive();
                cooler.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(cooler);
                //partsGroup.add(furnace);
            }
            break;
        case ObjectType.TANK:
            for (var i = 0; i < number; i++){
                var tank = context.add.sprite(CELL_WIDTH*11, CELL_WIDTH, 'TANK').setInteractive();
                tank.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(tank);
                //partsGroup.add(furnace);
                tank_sprite = tank;
            }
            break;
        case ObjectType.FUNCTIONBLOCK:
            var functionblock = context.add.sprite(CELL_WIDTH*12, CELL_WIDTH, 'FUNCTIONBLOCK').setInteractive();
            functionblock.anchor.x = 
            context.input.setDraggable(functionblock);
            functionblock.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
            break;
        default:
          // code block
    }
    
}

function createImmovables(context, type, y, x, direction){
    var imageID = getImageID(type);
    var obj = context.add.sprite((x+1)*CELL_WIDTH, (y+1)*CELL_WIDTH, imageID);
    obj.angle = getAngle(direction);
    obj.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
    obj_x = (obj.x/CELL_WIDTH)-1;
    obj_y = (obj.y/CELL_WIDTH)-1;
    var obj_direction = direction;
    grid[obj_y][obj_x] = new GameEntity(type, PurityLevel.CLEAN, WaterPhase.WATER, obj_direction, {y: obj_y, x: obj_x});
}

function getAngle(direction){
    switch (direction){
        case Direction.NORTH:
            return -90;
            break;
        case Direction.EAST:
            return 0;
            break;
        case Direction.SOUTH:
            return 90;
            break;
        case Direction.WEST:
            return -180;
            break;
        default:
            //
    }
}

function getImageID(type){
    switch (type){
        case ObjectType.SOURCE:
            return 'SOURCE';
            break;
        case ObjectType.PIPE:
            return 'PIPE';
            break;
        case ObjectType.BENDLEFT:
            return 'BENDLEFT';
            break;
        case ObjectType.BENDRIGHT:
            return 'BENDRIGHT';
            break;
        case ObjectType.CHECKPIPE:
            return 'CHECKPIPE';
            break;
        case ObjectType.DOUBLEDUAL:
            return'DOUBLEDUAL';
            break;
        case ObjectType.DOUBLELEFT:
            return 'DOUBLELEFT';
            break;
        case ObjectType.DOUBLERIGHT:
            return 'DOUBLERIGHT';
            break;
        case ObjectType.PURIFIER:
            return 'PURIFIER'
            break;
        case ObjectType.FURNACE:
            return 'FURNACE'
            break;
        case ObjectType.COOLER:
            return 'COOLER'
            break;
        case ObjectType.TANK:
            return 'TANK'
            break;
        case ObjectType.FUNCTIONBLOCK:
            return 'FUNCTIONBLOCK';
            break;
        case ObjectType.FUNCTIONCALL:
            return 'FUNCTIONCALL';
            break;
        case ObjectType.END:
            return 'END';
            break;
        default:
            //
    }
}


function generateLevel(context, current_level){
    
    var current_level_str = current_level + "";

    //var numLevels = LEVELS.numberOFLevels;
    var source_pos = LEVELS[current_level_str].SOURCE;
    var end_pos = LEVELS[current_level_str].END;
    var end2_pos = LEVELS[current_level_str].END2;
    var immovables = LEVELS[current_level_str].IMMOVABLES;
    
    if (current_level_str == "Function") {
        console.log(String(TEMP_CURRENT_LEVEL))
        movables = LEVELS[String(TEMP_CURRENT_LEVEL)].MOVABLES; 

        for (var i=0; i < movables.length; i++) {
            console.log(movables[i].quantity);
        }
    } else {
        var movables = LEVELS[current_level_str].MOVABLES;
    }

    //loop to display amount of pieces
    for (var i = 0; i < movables.length; i++){
        var key = movables[i].type;
        AVAILABLE_OBJECTS[key] = movables[i].quantity;
    } 

    var brick_img = context.add.image((source_pos.x)*CELL_WIDTH, (source_pos.y+2)*CELL_WIDTH, 'BRICK');
    
    var level_str_ = (CURRENT_LEVEL) + '';
    var water_purity_current_level = LEVELS[level_str_].WATER_PURITY_LEVEL;

    var phase_str_ = (CURRENT_LEVEL) + '';
    if(LEVELS[phase_str_].WATER_PHASE_LEVEL == WaterPhase.WATER){
        var water_img = context.add.image((source_pos.x)*CELL_WIDTH, (source_pos.y+2)*CELL_WIDTH, 'WATER');
        water_img.setScale(0.04);
    }
    else{
        var steam_img = context.add.image((source_pos.x)*CELL_WIDTH, (source_pos.y+2)*CELL_WIDTH, 'STEAM');
        steam_img.setScale(0.4);
    }

    for (var i=0; i<water_purity_current_level; i++) {
        console.log("taking a dump")
        var poop_img = context.add.image((source_pos.x-1)*CELL_WIDTH + i*CELL_WIDTH, (source_pos.y+3)*CELL_WIDTH, 'POOP');
        poop_img.setScale(0.25);
    }

    // var pipe = context.add.sprite(CELL_WIDTH*ObjectType.PIPE, CELL_WIDTH, 'PIPE').setInteractive();
    //             pipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
    //             context.input.setDraggable(pipe);
    //             pipe.angle -= 90;

    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if(grid[i][j] instanceof GameEntity) {
                console.log("In if")
                console.log(grid[i][j]);         
                switch(grid[i][j].kind_){
                    case ObjectType.PIPE:
                        var pipe = context.add.sprite(CELL_WIDTH*(j+1), CELL_WIDTH*(i+1), 'PIPE').setInteractive();
                        context.input.setDraggable(pipe);
                        pipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                        break;
                    case ObjectType.BENDLEFT:
                        var bendleft = context.add.sprite(CELL_WIDTH*(j+1), CELL_WIDTH*(i+1), 'BENDLEFT').setInteractive();
                        context.input.setDraggable(bendleft);
                        bendleft.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                        break;
                    case ObjectType.BENDRIGHT:
                        var bendright = context.add.sprite(CELL_WIDTH*(j+1), CELL_WIDTH*(i+1), 'BENDRIGHT').setInteractive();
                        context.input.setDraggable(bendright);
                        bendright.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                        break;
                    case ObjectType.DOUBLEDUAL:
                        var doubledual = context.add.sprite(CELL_WIDTH*(j+1), CELL_WIDTH*(i+1), 'DOUBLEDUAL').setInteractive();
                        context.input.setDraggable(doubledual);
                        doubledual.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                        break;
                    case ObjectType.DOUBLELEFT:
                        var doubleleft = context.add.sprite(CELL_WIDTH*(j+1), CELL_WIDTH*(i+1), 'DOUBLELEFT').setInteractive();
                        context.input.setDraggable(doubleleft);
                        doubleleft.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                        break;
                    case ObjectType.DOUBLERIGHT:
                        var doubleright = context.add.sprite(CELL_WIDTH*(j+1), CELL_WIDTH*(i+1), 'DOUBLERIGHT').setInteractive();
                        context.input.setDraggable(doubleright);
                        doubleright.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                    break;
                    case ObjectType.COOLER:
                        var cooler = context.add.sprite(CELL_WIDTH*(j+1), CELL_WIDTH*(i+1), 'COOLER').setInteractive();
                        context.input.setDraggable(cooler);
                        cooler.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                        break;
                    case ObjectType.TANK:
                        var tank = context.add.sprite(CELL_WIDTH*(j+1), CELL_WIDTH*(i+1), 'TANK').setInteractive();
                        context.input.setDraggable(tank);
                        tank.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                        break;
                    case ObjectType.FURNACE:
                        var furnace = context.add.sprite(CELL_WIDTH*(j+1), CELL_WIDTH*(i+1), 'FURNACE').setInteractive();
                        context.input.setDraggable(furnace);
                        furnace.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                        break;
                    case ObjectType.CHECKPIPE:
                        var checkpipe = context.add.sprite(CELL_WIDTH*(j+1), CELL_WIDTH*(i+1), 'CHECKPIPE').setInteractive();
                        context.input.setDraggable(checkpipe);
                        checkpipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                        break;
                    case ObjectType.FUNCTIONBLOCK:
                        var functionblock = context.add.sprite(CELL_WIDTH*(j+1), CELL_WIDTH*(i+1), 'FUNCTIONBLOCK').setInteractive();
                        
                        context.input.setDraggable(functionblock);
                        functionblock.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                        break;
                    default:
                        break;
                }
            }
        }
    }
        

    //start
    //console.log(source_pos.x+1);
    var start = context.add.sprite((source_pos.x+1)*CELL_WIDTH, (source_pos.y+1)*CELL_WIDTH, 'SOURCE');
    start.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
     start_x = (start.x/CELL_WIDTH)-1;
     start_y = (start.y/CELL_WIDTH)-1;
    var start_kind = getKind(start);
    var start_direction = getDirection(start.angle);
    grid[start_y][start_x] = new GameEntity(start_kind, LEVELS[current_level_str].WATER_PURITY_LEVEL, LEVELS[current_level_str].WATER_PHASE_LEVEL, start_direction, {y: start_y, x: start_x});
    grid[start_y][start_x-1] = -1;
    grid[start_y][start_x-2] = -1;
    grid[start_y+1][start_x] = -1;
    grid[start_y+1][start_x-1] = -1;
    grid[start_y+1][start_x-2] = -1;
    grid[start_y+2][start_x] = -1;
    grid[start_y+2][start_x-1] = -1;
    grid[start_y+2][start_x-2] = -1;

    


    //end
    var end = context.add.sprite((end_pos.x+1)*CELL_WIDTH, (end_pos.y+1)*CELL_WIDTH, 'END');
    end.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
    const end_x = (end.x/CELL_WIDTH)-1;
    const end_y = (end.y/CELL_WIDTH)-1;
    var end_kind = getKind(end);
    var end_direction = getDirection(start.angle);
    grid[end_y][end_x] = new GameEntity(end_kind, LEVELS[current_level_str].WATER_PURITY_LEVEL, LEVELS[current_level_str].WATER_PHASE_LEVEL, start_direction, {y: end_y, x: end_x});

    if (end2_pos) {
        var end2 = context.add.sprite((end2_pos.x+1)*CELL_WIDTH, (end2_pos.y+1)*CELL_WIDTH, 'END');
        end2.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
        const end2_x = (end2.x/CELL_WIDTH)-1;
        const end2_y = (end2.y/CELL_WIDTH)-1;
        var end2_kind = getKind(end2);
        var end2_direction = getDirection(start.angle);
        grid[end2_y][end2_x] = new GameEntity(end2_kind, LEVELS[current_level_str].WATER_PURITY_LEVEL, LEVELS[current_level_str].WATER_PHASE_LEVEL, start_direction, {y: end2_y, x: end2_x});

    }

    //game pieces
    for (var i = 0; i < movables.length; i++){
        var type = movables[i].type;
        var quantity = movables[i].quantity;
        create_sprites(context, quantity, type);
    }

    //immovables
    for (var i = 0; i < immovables.length; i++){
        var type = immovables[i].type;
        var y = immovables[i].y;
        var x = immovables[i].x;
        var direction = immovables[i].direction;
        createImmovables(context, type, y, x, direction);
    }

    // let result = simulate(grid, {y: start_y, x: start_x});
    // update_text(result.outcome);

}

function getKind(gameObject) {
    switch (gameObject.texture.key){
        case 'SOURCE':
            return ObjectType.SOURCE;
            break;
        case 'END':
            return ObjectType.END;
            break;
        case 'PIPE':
            return ObjectType.PIPE;
            break;
        case 'CHECKPIPE':
            return ObjectType.CHECKPIPE
            break;
        case 'BENDLEFT':
            return ObjectType.BENDLEFT;
            break;
        case 'BENDRIGHT':
            return ObjectType.BENDRIGHT;
            break;
        case 'DOUBLEDUAL':
            return ObjectType.DOUBLEDUAL;
            break;
        case 'DOUBLELEFT':
            return ObjectType.DOUBLELEFT;
            break;
        case 'DOUBLERIGHT':
            return ObjectType.DOUBLERIGHT;
            break;
        case 'PURIFIER':
            return ObjectType.PURIFIER;
            break;
        case 'FURNACE':
            return ObjectType.FURNACE;
            break;
        case 'COOLER':
            return ObjectType.COOLER;
            break;
        case 'TANK':
            return ObjectType.TANK;
            break;
        case 'FUNCTIONBLOCK':
            return ObjectType.FUNCTIONBLOCK;
            break;
        case 'FUNCTIONCALL':
            return ObjectType.FUNCTIONCALL;
            break;
        case 'run':
            return -1;
            break;
        default:
            //
    }
}

function getDirection(angle){
    switch (angle){
        case -90:
            return Direction.NORTH;
        break;
        case 0:
            return Direction.EAST;
        break;
        case 90:
            return Direction.SOUTH;
        break;
        case -180:
            return Direction.WEST;
        break;
        default:
            return -3
    }
}