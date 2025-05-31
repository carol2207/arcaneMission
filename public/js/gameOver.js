import Win from './win.js'
class GameOver extends Phaser.Scene{
    constructor(){
        super({key:"GameOver"});

    }

    preload(){
        
        this.load.font('titulo', './assets/Steamwreck-07pd.ttf');
        this.load.image("bg","./assets/losebg.png")
        this.load.audio("bgS","./assets/loseaudio.mp3")
    }

    create(){
        
    this.cursor = this.input.keyboard.createCursorKeys();
        this.bg = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2,"bg").setScale(.6);
        this.bgS = this.sound.add("bgS",{loop:true});
        this.bgS.play();

    }

    update(){

    if(this.cursor.space.isDown){
        window.location.reload();
    }

    if(this.cursor.shift.isDown){
        console.log("yendo a pantalla de win")
        this.scene.add("WinScene", new Win)
        this.scene.start("WinScene")
        this.bgS.stop();
    }

    }

}

export default GameOver