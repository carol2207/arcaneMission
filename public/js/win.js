class Win extends Phaser.Scene{
    constructor(){
        super({key:"WinScene"})
    }
    
    preload(){
        this.load.font('titulo', './assets/Steamwreck-07pd.ttf');
        this.load.image("bgW","./assets/winbg.png")
        this.load.audio("bgSW","./assets/winsound.mp3")
    }

    create(){
        
    this.cursor = this.input.keyboard.createCursorKeys();
    this.bg = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2,"bgW").setScale(.7);
    this.bgS = this.sound.add("bgSW",{loop:true});
    this.bgS.play();

    }


    update(){
    if(this.cursor.space.isDown){
        window.location.reload();
    }
    }
}

export default Win;