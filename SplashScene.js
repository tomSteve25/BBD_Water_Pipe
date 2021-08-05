class SplashScene extends Phaser.Scene {
    OFFSET = 21.875;
    CELL_WIDTH = 43.75;
    
    

    constructor(){
        super('SplashScene');
    }

    preload (){
        this.load.image('HowTo_1', 'assets/HowTopage_1.png');
        this.load.image('HowTo_2', 'assets/HowTopage_2.png');
        this.load.image('HowTo_3', 'assets/HowTopage_3.png');
    }
        
    create(){
        var howTo = this.add.sprite(0, 0, 'HowTo_1').setOrigin(0,0).setInteractive();
        var pageNum = 1;
        
        this.input.on('gameobjectdown', function(pointer, gameObject){
            if(pageNum == 1){
                howTo = this.add.sprite(0, 0, 'HowTo_2').setOrigin(0,0).setInteractive();
            }
            else if(pageNum == 2){
                howTo = this.add.sprite(0, 0, 'HowTo_3').setOrigin(0,0).setInteractive();
            }
            else{
                this.scene.start('GameScene');//.launch('GameInfoScene');
            }
            pageNum++;
        }, this);
    }

}