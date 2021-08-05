var infocontext;
class GameInfoScene extends Phaser.Scene {
    OFFSET = 21.875;
    CELL_WIDTH = 43.75;

    constructor(){
        super('GameInfoScene');
    }

    preload (){
        console.log("INFO SCREEN")
        this.load.image('info_bg', 'assets/info_bg.png');
        
    }
        
    create(){
        infocontext = this;
        var bg = this.add.image(WIDTH+CELL_WIDTH, HEIGHT, 'info_bg').setOrigin(1);
        bg.setScale(1.1);

        

        for (var type in AVAILABLE_OBJECTS){
            if (AVAILABLE_OBJECTS.hasOwnProperty(type)) {
                create_sprites_info_icons(this, 1, parseInt(type));
            }
        }

        // var level_str_ = (1+CURRENT_LEVEL) + '';
        // var water_purity_current_level = LEVELS[level_str_].WATER_PURITY_LEVEL;
        // // level_purity = infocontext.add.text(WIDTH-OFFSET-(4*CELL_WIDTH)-20, 700, `The purity level in the source is: ${water_purity_current_level}`, { font: "bold 11px Arial", fill: "40F", wordWrap: { width: 200, useAdvancedWrap: true } });
        // // purity_text = infocontext.add.text(WIDTH-OFFSET-(4*CELL_WIDTH)-20, 715, `Currently:\nNot yet started.`, { font: "bold 12px Arial", fill: "#000", wordWrap: { width: 200, useAdvancedWrap: true } });
        // // console.log("COUNT TEXTS", count_texts)

        // var phase_str_ = (1+CURRENT_LEVEL) + '';
        // // var water_phase_current_level = LEVELS[phase_str_].WATER_PHASE_LEVEL;
        // var level_phase = infocontext.add.text(WIDTH-OFFSET-(4*CELL_WIDTH)-20, 655, `Water Properties:`, { font: "bold 15px Arial", fill: "#00F", wordWrap: { width: 200, useAdvancedWrap: true } });
        // var arrow_img = this.add.image(WIDTH-OFFSET-(4*CELL_WIDTH) + 60, 700, 'ARROW');
        // arrow_img.setScale(0.08)
        // if(LEVELS[phase_str_].WATER_PHASE_LEVEL == WaterPhase.WATER){
        //     var water_img = this.add.image(WIDTH-OFFSET-(4*CELL_WIDTH), 700, 'WATER');
        //     water_img.setScale(0.05);
        //     arrow_img.angle += 180;
        // }
        // else{
        //     var steam_img = this.add.image(WIDTH-OFFSET-(4*CELL_WIDTH), 700, 'STEAM');
        //     steam_img.setScale(0.4);
        // }

        
        //var water_phase_current_level = ( LEVELS[phase_str_].WATER_PHASE_LEVEL == 1 ? "WATER" : "STEAM");
        //var level_phase = infocontext.add.text(WIDTH-OFFSET-(4*CELL_WIDTH)-20, 685, `Phase: ${water_phase_current_level}`, { font: "bold 11px Arial", fill: "#00F", wordWrap: { width: 200, useAdvancedWrap: true } });


        // for (var i=0; i<water_purity_current_level; i++) {
        //     console.log("taking a dump")
        //     var poop_img = this.add.image(WIDTH-OFFSET-(4*CELL_WIDTH) + i*40, 750, 'POOP');
        //     poop_img.setScale(0.25);
        // }

        /*
        var tutorial_text;
        switch(CURRENT_LEVEL){
            case "1":
                tutorial_text = infocontext.add.text(WIDTH-OFFSET-(4*CELL_WIDTH)-20, 655, `Water Properties:`, { font: "bold 15px Arial", fill: "#00F", wordWrap: { width: 200, useAdvancedWrap: true } });
            break;

            case "2":

        }
        */
    }
}


var ipipe;
var ibend_left;
var ibend_right;
var icheck_pipe;
var idouble_pipe_dual;
var idouble_pipe_left;
var idouble_pipe_right;
var ipurifier;
var purity_text;
var level_purity;
var simulate_outcome;
var ifurnace;
var icooler;
var itank;

function update_text(simulate_outcome_){
    simulate_outcome = simulate_outcome_;

    console.log("TEXT UPDATED");
    console.log(AVAILABLE_OBJECTS)
    var x = WIDTH-OFFSET-(4*CELL_WIDTH);
    var y = CELL_WIDTH;
    var text_y = (y-10);
    var text_x = x + CELL_WIDTH;
    const style = { font: "bold 12px Arial", fill: "#000" };    

    if (ipipe) {
        count_texts.pipe_text.destroy();
        var ipipey = ipipe.y;  
        count_texts.pipe_text = infocontext.add.text(text_x, ipipey, `Straight: ${AVAILABLE_OBJECTS[ObjectType.PIPE]}`, style);}
    if (ibend_left) {
        count_texts.bendleft_text.destroy();
        var ibend_lefty = ibend_left.y;
        count_texts.bendleft_text = infocontext.add.text(text_x, ibend_lefty, `Left bend: ${AVAILABLE_OBJECTS[ObjectType.BENDLEFT]}`, style);}
    if (ibend_right) {
        count_texts.bendright_text.destroy();
        var ibend_righty = ibend_right.y;
        count_texts.bendright_text = infocontext.add.text(text_x, ibend_righty, `Right bend: ${AVAILABLE_OBJECTS[ObjectType.BENDRIGHT]}`, style);}
    if (icheck_pipe) {
        count_texts.checkpipe_text.destroy();
        var icheck_pipey = icheck_pipe.y;
        count_texts.checkpipe_text = infocontext.add.text(text_x, icheck_pipey, `Separator: ${AVAILABLE_OBJECTS[ObjectType.CHECKPIPE]}`, style);}
    if (idouble_pipe_dual) {
        count_texts.doubledual_text.destroy();
        var idouble_pipe_dualy = idouble_pipe_dual.y;
        count_texts.doubledual_text = infocontext.add.text(text_x, idouble_pipe_dualy, `Left-Right double: ${AVAILABLE_OBJECTS[ObjectType.DOUBLEDUAL]}`, style);}
    if (idouble_pipe_left) {
        count_texts.doubleleft_text.destroy();
        var idouble_pipe_lefty = idouble_pipe_left.y;
        count_texts.doubleleft_text = infocontext.add.text(text_x, idouble_pipe_lefty, `Left double: ${AVAILABLE_OBJECTS[ObjectType.DOUBLELEFT]}`, style);}
    if (idouble_pipe_right) {
        count_texts.doubleright_text.destroy();
        var idouble_pipe_righty = idouble_pipe_right.y;
        count_texts.doubleright_text = infocontext.add.text(text_x, idouble_pipe_righty, `Right double: ${AVAILABLE_OBJECTS[ObjectType.DOUBLERIGHT]}`, style);}
    if (ipurifier) {
        count_texts.purifier_text.destroy();
        var ipurifiery = ipurifier.y;
        count_texts.purifier_text = infocontext.add.text(text_x, ipurifiery, `Filter: ${AVAILABLE_OBJECTS[ObjectType.PURIFIER]}`, style);}
    if (ifurnace) {
        count_texts.furnace_text.destroy();
        var ifurnacey = ifurnace.y;
        count_texts.furnace_text = infocontext.add.text(text_x, ifurnacey, `Heater: ${AVAILABLE_OBJECTS[ObjectType.FURNACE]}`, style);}
    if (icooler) {
        count_texts.cooler_text.destroy();
        var icoolery = icooler.y;
        count_texts.cooler_text = infocontext.add.text(text_x, icoolery, `Cooler: ${AVAILABLE_OBJECTS[ObjectType.COOLER]}`, style);}
    if (itank) {
        count_texts.tank_text.destroy();
        var itanky = itank.y;
        count_texts.tank_text = infocontext.add.text(text_x, itanky, `Tank: ${AVAILABLE_OBJECTS[ObjectType.TANK]}`, style);}
        // if (purity_text){
    //     console.log("UPDATED!!!!!!!!!!!!!")
    //     if (simulate_outcome.outcome === undefined){
    //         purity_text.setText(`Currently:\nNot yet started.`);
    //     }else if (simulate_outcome.outcome) {
    //         purity_text.setText(`Currently:\n${simulate_outcome.message}`);
    //         purity_text.setColor('#135029')
    //     }else{
    //         purity_text.setText(`Currently:\n${simulate_outcome.err}`);
    //         purity_text.setColor('#f00')
    //     }
    //     //purity_text = infocontext.add.text(text_x-CELL_WIDTH, 743, `Currently:\n${simulate_outcome}`, style);
    // }
    
}


function create_sprites_info_icons(context, number, type) {
    //generates sprites givent the number of sprites needed and the type of sprite needed
    var x = WIDTH-OFFSET-(4*CELL_WIDTH);
    var y = CELL_WIDTH;
    var text_y = (y-10);
    var text_x = x + CELL_WIDTH;
    
    const style = { font: "bold 12px Arial", fill: "#000"};
    
    switch (type) {
        case ObjectType.PIPE:
            ipipe = context.add.sprite(x, y, 'PIPE'); // wasnt interactive
            ipipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
            count_texts.pipe_text = context.add.text(text_x, ipipe.y, `Straight: ${AVAILABLE_OBJECTS[type]}`, style);
            break;
        case ObjectType.BENDLEFT:
            ibend_left = context.add.sprite(x, y*2.5, 'BENDLEFT');
            ibend_left.angle += 180;
            ibend_left.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
            count_texts.bendleft_text = context.add.text(text_x, ibend_left.y, `Left bend: ${AVAILABLE_OBJECTS[type]}`, style);
            break;
        case ObjectType.BENDRIGHT:
            ibend_right = context.add.sprite(x, y*4, 'BENDRIGHT');
            ibend_right.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
            count_texts.bendright_text = context.add.text(text_x, ibend_right.y, `Right bend: ${AVAILABLE_OBJECTS[type]}`, style);
            break;
        case ObjectType.CHECKPIPE:
            icheck_pipe = context.add.sprite(x, y*5.5, 'CHECKPIPE');
            icheck_pipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
            count_texts.checkpipe_text = context.add.text(text_x, icheck_pipe.y, `Separator: ${AVAILABLE_OBJECTS[type]}`, style);
             icheck.setInteractive();
                                    icheck.on('pointerdown', function (pointer) {
                                        document.getElementById('seperatorInfo').click();
                                    });
            break;
        case ObjectType.DOUBLEDUAL:
            idouble_pipe_dual = context.add.sprite(x, y*7, 'DOUBLEDUAL');
            idouble_pipe_dual.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
            count_texts.doubledual_text = context.add.text(text_x, idouble_pipe_dual.y, `Left-Right double: ${AVAILABLE_OBJECTS[type]}`, style);
            break;
        case ObjectType.DOUBLELEFT:
            idouble_pipe_left = context.add.sprite(x, y*8.5, 'DOUBLELEFT');
            idouble_pipe_left.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
            count_texts.doubleleft_text = context.add.text(text_x, idouble_pipe_left.y, `Left double: ${AVAILABLE_OBJECTS[type]}`, style);
            break;
        case ObjectType.DOUBLERIGHT:
            idouble_pipe_right = context.add.sprite(x, y*10, 'DOUBLERIGHT');
            idouble_pipe_right.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
            count_texts.doubleright_text = context.add.text(text_x, idouble_pipe_right.y, `Right double: ${AVAILABLE_OBJECTS[type]}`, style);
            break;
        case ObjectType.PURIFIER:
            ipurifier = context.add.sprite(x, y*11.5, 'PURIFIER');
            ipurifier.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
            count_texts.purifier_text = context.add.text(text_x, ipurifier.y, `Filter: ${AVAILABLE_OBJECTS[type]}`, style);
            break;
        case ObjectType.FURNACE:
            ifurnace = context.add.sprite(x, y*13, 'FURNACE');
            ifurnace.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
            count_texts.furnace_text = context.add.text(text_x, ifurnace.y, `Heater: ${AVAILABLE_OBJECTS[type]}`, style);
        break;
        case ObjectType.COOLER:
            icooler = context.add.sprite(x, y*14.5, 'COOLER');
            icooler.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
            count_texts.cooler_text = context.add.text(text_x, icooler.y, `Cooler: ${AVAILABLE_OBJECTS[type]}`, style);
            icooler.setInteractive();
            icooler.on('pointerdown', function (pointer) {
                document.getElementById('coolerInfo').click();
            });
            break;
        case ObjectType.TANK:
            itank = context.add.sprite(x, y*16, 'TANK');
            itank.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
            count_texts.tank_text = context.add.text(text_x, itank.y, `Tank: ${AVAILABLE_OBJECTS[type]}`, style);
            itank.setInteractive();
                                    itank.on("pointerdown", function (pointer) {
                                      document
                                        .getElementById("storageInfo")
                                        .click();
                                    });
            break;
        //MISSING: functionblock and functioncal
        default:
            console.log("INSIDE FUNCTION DEFAULT");
    }
    
}