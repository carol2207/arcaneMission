import GameOver from "./gameOver.js"
import Nivel2 from "./scene2.js"

class Nivel1 extends Phaser.Scene {
    constructor(){
        super({key:"Nivel1"});
        this.boxWidth = 0;
        this.landscapeWidth = 0;
        this.miniboxW = 0;
        this.chimpSpeed = -150; // Velocidad hacia arriba
        this.respawnY = this.scale?.height - 10 || 900; // Posición de reaparecer
         this.bomberSpeed = 300; // Velocidad de movimiento horizontal
    this.minX = 0; // Mismo límite izquierdo que aim0
    this.maxX = 0; // Mismo límite derecho que aim0
    this.Points = 0
    this.cupcakesKilled = 0
    this.bombersKilled = 0
    }

    preload() {
        console.log("soy preload");
        this.load.image("jinx", "./assets/jinxx.png");
        this.load.image("land", "./assets/bg.png");
        this.load.image("box", "./assets/box.jpg"); 
        this.load.image("bullet","./assets/orbe.png");
        this.load.image("cupcake","./assets/cupake.png");
        this.load.image("aim0","./assets/crosshair.png");
        this.load.image("cohete","./assets/cohete.png");
        this.load.image("bomber","./assets/bomber.png");
        this.load.image("bomb","./assets/jinx bomb.png")
        this.load.image("Nikess","./assets/cupcakedead.png")
        this.load.audio("explodes","./assets/enemy_explotion.ogg")
        this.load.audio("bgFS","./assets/Fight.mp3")
        this.load.audio("shot","./assets/player_shoot.ogg")
        this.load.audio("drop","./assets/enemy_shoot.ogg")
        this.load.audio("Chimp","./assets/chimpS.mp3");
        this.load.audio("upgrade","./assets/uplong.wav")
    }

    create() {
    this.bgsound = this.sound.add("bgFS",{loop:true})
    this.bgsound.play()
    this.BombardiDestroyed = this.sound.add("explodes",{loop:false});
    this.shot = this.sound.add("shot",{loop:false});
    this.drop = this.sound.add("drop",{loop:false});
    this.ChimpS = this.sound.add("Chimp",{loop:false});
    this.upgradee = this.sound.add("upgrade",{loop:false});
    
        this.bullets = this.physics.add.group();
        this.minX = 270;
        this.maxX = this.sys.game.config.width - 270; 
        
        this.bombs = this.physics.add.group();

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.land = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2,"land").setScale(1.1);
        this.box12 = this.physics.add.image(0, 0, "box").setScale(2.74);

        this.jinx = this.add.image(this.scale.width / 2 - 23, this.scale.height - 200, "jinx").setScale(0.5).setOrigin(.33,.5);

        this.chimp1 = this.physics.add.image(102, this.respawnY, "cohete").setScale(0.8).setAngle(270);
        this.chimp2 = this.physics.add.image(this.scale.width - 102, this.respawnY, "cohete").setScale(0.8).setAngle(90);
        this.chimp2.flipX = true;
        this.chimp1.setImmovable()
        this.chimp2.setImmovable()
        // Establecer velocidad en el eje Y
        this.chimp1.body.setVelocityY(this.chimpSpeed);
        this.chimp2.body.setVelocityY(this.chimpSpeed);

        // Configurar físicas en el mundo
        this.physics.world.enable([this.chimp1, this.chimp2]);

        // Cajas en las esquinas inferiores
        this.box1 = this.add.image(0, 0, "box").setScale(0.4);
        this.box2 = this.add.image(0, 0, "box").setScale(0.4);
        this.box3 = this.add.image(0, 0, "box").setScale(0.243);
        this.box4 = this.add.image(0, 0, "box").setScale(0.243);
        this.box5 = this.add.image(0, 0, "box").setScale(0.243);
        this.box6 = this.add.image(0, 0, "box").setScale(0.243);
        this.box7 = this.add.image(0, 0, "box").setScale(0.243);
        this.box8 = this.add.image(0, 0, "box").setScale(0.243);
        this.box9 = this.add.image(0, 0, "box").setScale(0.243);
        this.box10 = this.add.image(0, 0, "box").setScale(0.243);
        this.box11 = this.add.image(0, 0, "box").setScale(0.243);
        this.box13 = this.add.image(0, 0, "box").setScale(0.243);
        this.box14 = this.add.image(0, 0, "box").setScale(0.243);
        

        this.cupcake1 = this.physics.add.image(0, 0, "cupcake").setScale(.3);
        this.cupcake2 = this.physics.add.image(0, 0, "cupcake").setScale(.3);
        this.cupcake3 = this.physics.add.image(0, 0, "cupcake").setScale(.3);
        this.cupcake4 = this.physics.add.image(0, 0, "cupcake").setScale(.3);
        this.cupcake5 = this.physics.add.image(0, 0, "cupcake").setScale(.3);
        this.cupcake6 = this.physics.add.image(0, 0, "cupcake").setScale(.3);
        this.cupcake7 = this.physics.add.image(0, 0, "cupcake").setScale(.3);
        this.cupcake8 = this.physics.add.image(0, 0, "cupcake").setScale(.3);

        this.bombers = this.physics.add.group();
    
    // Posiciones iniciales (usa this.minX y this.maxX para posicionarlos dentro de los límites)
    const bomberPositions = [
        { x: this.minX + 50, y: 40 },  // 50 píxeles desde el borde izquierdo
        { x: this.maxX - 50, y: 160 }, // 50 píxeles desde el borde derecho
        { x: (this.minX + this.maxX) / 2, y: 100 } // Centro horizontal
    ];
    
    bomberPositions.forEach(pos => {
        const bomber = this.bombers.create(pos.x, pos.y, "bomber")
            .setScale(0.2)
            .refreshBody(); // Actualiza el cuerpo físico
        
        // Asigna velocidad inicial aleatoria para variedad
        const speed = this.bomberSpeed
        bomber.body.setVelocityX(-speed);
    });
        this.aim = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, "aim0")

        this.cupcake1.flipX = true;
        this.cupcake2.flipX = true;
        this.cupcake3.flipX = true;
        this.cupcake4.flipX = true;

        this.boxWidth = this.box1.displayWidth * 2;
        console.log(this.boxWidth);
        this.landscapeWidth = this.land.displayWidth - this.boxWidth;
        console.log(this.landscapeWidth);
        this.miniboxW = this.box3.displayWidth + 1;
        console.log(this.miniboxW);

        // collidersss
        
        this.updateBoxPositions();
        this.physics.add.collider(this.bullets,this.chimp1,this.rebote,null,this)
        this.physics.add.collider(this.bullets,this.chimp2,this.rebote,null,this)
        this.physics.add.collider(this.bullets,this.bombs,this.destroy,null,this)

        this.physics.add.collider(this.bullets, this.bombers, this.destroyy, null, this);
        
        // Colisión entre bombs y cupcakes
        this.physics.add.collider(
        this.bombs, 
        [
            this.cupcake1, this.cupcake2, this.cupcake3, this.cupcake4,
            this.cupcake5, this.cupcake6, this.cupcake7, this.cupcake8
        ],
        this.cupcake,
        null,
        this);

        this.physics.add.collider(this.bombs,this.box12,this.bombb,null,this)
        
        // Configuración de controles
        this.cursor = this.input.keyboard.createCursorKeys();

    this.pointsText = this.add.text(
        this.sys.game.config.width/2, 
        this.sys.game.config.height - 60, 
        `Puntos: ${this.Points}`, // Usa template literals
        {
            fontSize: 50,
            fontFamily: 'titulo',
            color: '#000000',
            align: 'center'
        }
    ).setOrigin(0.5);


    }

    bombb(bomb,box12){

        box12.destroy();
        bomb.body.setImmovable(true);
        bomb.body.moves = false; 
    }


    cupcake(bomb, cupcake) {
    bomb.destroy()
    
    if (cupcake) {
        this.cupcakesKilled += 1
        this.tweens.add({
            targets: cupcake,
            alpha: 0,
            duration: 300,
            onComplete: () => cupcake.destroy()
        });
    }
    
}


destroy(bullet, target) {
    if (bullet) {
        bullet.destroy(); // Destruye la bala al impactar
        this.activeBullet = null; // Limpia la referencia
    }

    if (target) {
        target.destroy(); // Destruye el objeto si es necesario
    }
    this.Points += 100
    console.log("has sumado 100 puntos")
}

destroyy(bullet, target) {
    this.bombersKilled += 1;
    console.log(this.bombersKilled)
    this.BombardiDestroyed.play();
    if (bullet) {
        bullet.destroy(); // Destruye la bala al impactar
        this.activeBullet = null; // Limpia la referencia
    }

    if (target) {
        target.destroy(); // Destruye el objeto si es necesario
    }
    this.Points += 500;
    console.log("has sumado 500 puntos")
}


rebote(bullet, chimp) {
    this.activeBullet.setVelocityY(0);
    this.activeBullet.setBounce(3)
    this.activeBullet.setVelocityX(this.activeBullet.body.velocity.x > 0 ? 800 : -800);
}

moveBomber(bomber) {
    if (!bomber.active) return;

    // Cambia de dirección si alcanza los límites
    if (bomber.x <= this.minX) {
        bomber.body.setVelocityX(this.bomberSpeed);
        bomber.flipX = true // Mover derecha
    } 
    else if (bomber.x >= this.maxX) {
        bomber.body.setVelocityX(-this.bomberSpeed);
        bomber.flipX= false // Mover izquierda
    }
    if (Phaser.Math.Between(1, 300) <= 1) {
        this.bomb(bomber);
    }
}

bomb(bomber) {
    
    this.drop.play()
    const bomb = this.bombs.create(
        bomber.x,
        bomber.y + 30, // 30 píxeles debajo del bomber
        "bomb"
    ).setScale(0.06);

    // Configura la física del bomb
    bomb.body.setVelocityY(200); // Caída hacia abajo
    //bomb.body.setVelocityX(Phaser.Math.Between(-50, 50)); // Pequeño movimiento horizontal aleatorio
    
    // Destruir el bomb si sale de la pantalla
    bomb.body.setCollideWorldBounds(false);
    //bomb.setDepth(1); // Para que aparezca sobre otros objetos
}

shootBullet() {
    if (this.activeBullet) {
        return; // No disparar si ya hay una bala activa
    }
    this.shot.play();
    // Crear bala en la posición de jinx
    this.activeBullet = this.bullets.create(this.jinx.x, this.jinx.y, "bullet").setScale(0.035);

    // Calcular dirección hacia aim0
    let angle = Phaser.Math.Angle.Between(this.jinx.x, this.jinx.y, this.aim.x, this.aim.y);
    let speed = 700;

    // Establecer velocidad en la dirección calculada
    this.activeBullet.setVelocityX(Math.cos(angle) * speed);
    this.activeBullet.setVelocityY(Math.sin(angle) * speed);
    //this.activeBullet.setBounce(1)
    // Configurar los límites de la pantalla
    this.activeBullet.setCollideWorldBounds(true);
    this.activeBullet.body.onWorldBounds = true;

    // Destruir la bala cuando salga de los límites de la pantalla
    this.physics.world.on("worldbounds", (body) => {
        if (body.gameObject === this.activeBullet) {
            this.activeBullet.destroy();
            this.activeBullet = null; // Permitir disparar otra bala
        }
    });
}
    update() {

        this.pointsText.setText(`Puntos: ${this.Points}`)

    if (!this.firstWaveComplete && this.chimp1.y < -this.chimp1.displayHeight * 2 && this.chimp2.y < -this.chimp2.displayHeight * 2) {
        this.firstWaveComplete = true;
        this.nextChimp = "chimp1"; // Define cuál chimp sale primero después de la primera ola

        // Activar el primer ciclo intercalado
        this.time.delayedCall(2000, () => { 
            this.chimp1.setPosition(this.chimp1.x, this.respawnY);
            this.chimp1.visible = true;
        });
    }

    // Intercalar después de la primera ola
    if (this.firstWaveComplete) {  
        if (this.nextChimp === "chimp1" && this.chimp2.y < -this.chimp2.displayHeight * 2) {
            this.chimp2.visible = false;
            this.time.delayedCall(2000, () => { 
                this.chimp1.setPosition(this.chimp1.x, this.respawnY);
                this.chimp1.visible = true;
                this.nextChimp = "chimp2"; // Define el siguiente turno
            });
        }

        if (this.nextChimp === "chimp2" && this.chimp1.y < -this.chimp1.displayHeight * 2) {
            this.chimp1.visible = false;
            this.time.delayedCall(2000, () => { 
                this.chimp2.setPosition(this.chimp2.x, this.respawnY);
                this.chimp2.visible = true;
                this.nextChimp = "chimp1"; // Define el siguiente turno
            });
        }
    }

        // Movimiento del objetivo con teclado
    const minX = 200;
    const maxX = this.sys.game.config.width - 200;
    const minY = 250;
    const maxY = 500;

    // Movimiento del objetivo con teclado dentro de los límites
    if (this.cursor.right.isDown && this.aim.x + 12 <= maxX) {
        this.aim.x += 12;
    }
    if (this.cursor.left.isDown && this.aim.x - 12 >= minX) {
        this.aim.x -= 12;
    }
    if (this.cursor.down.isDown && this.aim.y + 12 <= maxY) {
        this.aim.y += 12;
    }
    if (this.cursor.up.isDown && this.aim.y - 12 >= minY) {
        this.aim.y -= 12;
    }

    if(this.aim.x > this.sys.game.config.width/2){
        this.jinx.flipX = true
    }else{
        this.jinx.flipX = false
    }


this.bombers.getChildren().forEach(bomber => {
        this.moveBomber(bomber);
    });

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        this.shootBullet(); // Llamar función de disparo
        }

        if(this.cupcakesKilled == 8){
            this.time.delayedCall(1111,()=>{
                console.log(this.cupcakesKilled)
                this.scene.add("GameOver", new GameOver)
                this.scene.start("GameOver");
                this.bgsound.stop();
            })
        }

        if(this.bombersKilled == 3){
            this.time.delayedCall(1111,()=>{
                this.upgradee.play();
                this.scene.add("Nivel2", new Nivel2)
                this.scene.start("Nivel2",{
                    score:this.Points
                })
                this.bgsound.stop();
            })
        }

    }

    updateBoxPositions() {
        const padding = 100;
        const boxY = this.scale.height - 100;
        const boxYmini = (boxY + this.boxWidth * 0.10) - 3;
        const boxXmini = (this.boxWidth + padding) / 2 + 11;
        const tralaH = this.scale.height - 168;

        this.box12.setPosition(padding*3 + boxXmini*2 + 30 ,boxY*1.8 + 70)
        this.box1.setPosition(padding, boxY);
        this.box2.setPosition(this.scale.width - padding, boxY);
        this.box3.setPosition(boxXmini, boxYmini);
        this.box4.setPosition(boxXmini + this.miniboxW, boxYmini);
        this.box5.setPosition(boxXmini + this.miniboxW * 2, boxYmini);
        this.box6.setPosition(boxXmini + this.miniboxW * 3, boxYmini);
        this.box7.setPosition(boxXmini + this.miniboxW * 4, boxYmini);
        this.box8.setPosition(boxXmini + this.miniboxW * 5, boxYmini);
        this.box9.setPosition(boxXmini + this.miniboxW * 6, boxYmini);
        this.box10.setPosition(boxXmini + this.miniboxW * 7, boxYmini);
        this.box11.setPosition(boxXmini + this.miniboxW * 8, boxYmini);
        this.box13.setPosition(boxXmini + this.miniboxW*9, boxYmini)
        this.box14.setPosition(boxXmini + this.miniboxW*10, boxYmini)

        this.cupcake1.setPosition(boxXmini + this.miniboxW/2, tralaH);
        this.cupcake2.setPosition(boxXmini + this.miniboxW + this.miniboxW/2, tralaH);
        this.cupcake3.setPosition(boxXmini + this.miniboxW * 2 + this.miniboxW/2, tralaH);
        this.cupcake4.setPosition(boxXmini + this.miniboxW * 3 + this.miniboxW/2, tralaH);
        this.cupcake5.setPosition(boxXmini + this.miniboxW * 7 - this.miniboxW/2, tralaH);
        this.cupcake6.setPosition(boxXmini + this.miniboxW * 8 - this.miniboxW/2, tralaH);
        this.cupcake7.setPosition(boxXmini + this.miniboxW * 9 - this.miniboxW/2, tralaH);
        this.cupcake8.setPosition(boxXmini + this.miniboxW * 10 - this.miniboxW/2, tralaH);

        this.chimp2.flipX = true;
    }
}

export default Nivel1;
