export class game extends Phaser.Scene {

    constructor() {
        super('game');
    }

    preload() {
        this.load.image('background', 'assets/restaurante.png');
        this.load.image('personaje', 'assets/padre.png');
        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
        this.load.spritesheet('camarero', 'assets/camarero.png', {frameWidth: 200, frameHeight: 277});
        this.load.image('kimchi', 'assets/entrantes/kimchi.png');
        this.load.image('gyozas', 'assets/entrantes/gyozas.png');
        this.load.image('samosa', 'assets/entrantes/samosa.png');
        this.load.image('pakora', 'assets/entrantes/Pakora.png');
        this.load.image('Bibimbap', 'assets/principales/Bibimbap.png');
        this.load.image('naengmyeon', 'assets/principales/Naengmyeon.png');
        this.load.image('pad_thai', 'assets/principales/pad_thai.png');
        this.load.image('pho', 'assets/principales/pho.png');
        this.load.image('ddeok', 'assets/postres/Ddeok.png');
        this.load.image('halo-halo', 'assets/postres/halo-halo.png');       
        this.load.image('mochi', 'assets/postres/mochi.png');
        this.load.image('kuih_lapis', 'assets/postres/kuih_lapis.png');
        this.load.image('dasik', 'assets/dasik.png');
    }
    create() {
        
        this.background = this.add.tileSprite(640 , 360 , 1536, 1024, 'background');
        this.background.setDepth(-2);        
        const personaje = this.add.image(560, 600, 'personaje');
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('camarero', { start: 0, end: 2 }),
            frameRate: 2,
            repeat: -1
        });
        this.mensajeTexto = this.add.text(640, 100, '', {
            fontSize: '28px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 500, useAdvancedWrap: true }
        }).setOrigin(0.5);
        let buttonText = this.add.text(550, 360, 'JUGAR', {
        fontSize: '32px',
        fill: '#ffffff',
        backgroundColor: '#4444ff',
        padding: { x: 20, y: 10 }
        });
        buttonText.setInteractive();
        buttonText.on('pointerdown', () => {
            this.hacer_pedido();
            this.mensajeTexto.setText('¡Elige entrante!');
            buttonText.destroy()
        });
        this.direccion = 1;
        this.camarero = null;
        this.puntos=0;
        this.plato_actual=0;
        
    }

    mover_camarero() {
        if (!this.camarero) {
            this.camarero = this.add.sprite(-50, 450, 'camarero');
            this.camarero.setScale(1.5)
            this.camarero.play('andar');
            this.camarero.setDepth(-1);
        }
        this.camarero.x += 20 * this.direccion;
        
        if (this.camarero.x >= 500) {
            this.direccion = -1;
            this.camarero.flipX = true; 
        } 
        if (this.camarero.x <= -50) {
            this.camarero.destroy();
            this.camarero = null;
        }
    }
    mostrar_boton_siguiente() {
        let siguiente_btn = this.add.text(640, 600, 'SIGUIENTE PLATO', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#44ff44',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5);

        siguiente_btn.setInteractive();
        siguiente_btn.on('pointerover', () => {
            siguiente_btn.setTint(0xcccccc);
        });
        siguiente_btn.on('pointerout', () => {
            siguiente_btn.clearTint(); 
        });
        
        siguiente_btn.on('pointerdown', () => {
            siguiente_btn.destroy();
            if(this.plato_actual==1){this.mensajeTexto.setText('¡Elige plato principal!');}
            else{this.mensajeTexto.setText('¡Elige postre!');}
            this.hacer_pedido();
        });
    }
    acabar_partida()
    {
        if(this.puntos==6)
        {
            this.mensajeTexto.setText('El chef esta soprprendido por tu empeño en comprender la cultura local, ha decidido hacerte un obsequio')
            this.add.image(640, 250, 'dasik');
        }
        else if(this.puntos<6 && this.puntos>2)
        {
            this.mensajeTexto.setText('Gracias por venir. El chef te envia un saludo')
        }
        else{this.mensajeTexto.setText('El chef está muy decepcionado con tus elecciones y pide que no se te vuelva a servir')}
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 5000);
    }
    mostrar_boton_final()
    {
        let final_btn = this.add.text(640, 600, 'ACABAR PEDIDO', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#44ff44',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5);

        final_btn.setInteractive();
        
        // Efectos hover
        final_btn.on('pointerover', () => {
            final_btn.setTint(0xcccccc);
        });
        final_btn.on('pointerout', () => {
            final_btn.clearTint(); 
        });
        
        final_btn.on('pointerdown', () => {
            final_btn.destroy();
            this.acabar_partida()
        });
    }
    hacer_pedido()
    {
        this.camarero_timer = this.time.addEvent({
                delay: 120,        
                callback: this.mover_camarero,
                callbackScope: this,
                repeat: 100      
            });
        if(this.plato_actual==0)
        {
            let button_1 = this.add.image(427, 240, 'kimchi');
            button_1.setScale(0.5);
            button_1.setInteractive();
            button_1.on('pointerdown', () => {this.puntos+=2;
            this.mensajeTexto.setText('¡Elegiste kimchi!');
            button_1.destroy();
            button_2.destroy();
            button_3.destroy();
            button_4.destroy();
            this.mostrar_boton_siguiente()});
            button_1.on('pointerover', () => {
            button_1.setTint(0xcccccc);
            });
            button_1.on('pointerout', () => {
            button_1.clearTint(); 
            });
            let button_2 = this.add.image(853, 240, 'gyozas');
            button_2.setScale(0.5);
            button_2.setInteractive();
            button_2.on('pointerdown', () => {this.puntos++;
            this.mensajeTexto.setText('¡Elegiste gyozas!');
            button_1.destroy();
            button_2.destroy();
            button_3.destroy();
            button_4.destroy();
            this.mostrar_boton_siguiente()});
            button_2.on('pointerover', () => {
            button_2.setTint(0xcccccc);
            });
            button_2.on('pointerout', () => {
            button_2.clearTint(); 
            });
            let button_3 = this.add.image(427, 480, 'pakora');
            button_3.setScale(0.5);
            button_3.setInteractive();
            button_3.on('pointerdown', () => {this.mensajeTexto.setText('¡Elegiste pakora!');
            button_1.destroy();
            button_2.destroy();
            button_3.destroy();
            button_4.destroy();
            this.mostrar_boton_siguiente()});
            button_3.on('pointerover', () => {
            button_3.setTint(0xcccccc);
            });
            button_3.on('pointerout', () => {
            button_3.clearTint(); 
            });
            let button_4 = this.add.image(853, 480, 'samosa');
            button_4.setScale(0.5);
            button_4.setInteractive();
            button_4.on('pointerdown', () => {this.mensajeTexto.setText('¡Elegiste samosa!');
            button_1.destroy();
            button_2.destroy();
            button_3.destroy();
            button_4.destroy();
            this.mostrar_boton_siguiente()});
            button_4.on('pointerover', () => {
            button_4.setTint(0xcccccc);
            });
            button_4.on('pointerout', () => {
            button_4.clearTint(); 
            });          
        }
        else if(this.plato_actual==1)
        {
            let button_5 = this.add.image(427, 240, 'Bibimbap');
            button_5.setScale(0.5);
            button_5.setInteractive();
            button_5.on('pointerdown', () => {this.puntos++
            this.mensajeTexto.setText('¡Elegiste bibimbap!');
            button_5.destroy();
            button_6.destroy();
            button_7.destroy();
            button_8.destroy();
            this.mostrar_boton_siguiente()
            });
            button_5.on('pointerover', () => {
            button_5.setTint(0xcccccc);
            });
            button_5.on('pointerout', () => {
            button_5.clearTint(); 
            });
            let button_6 = this.add.image(853, 240, 'pho');
            button_6.setScale(0.5);
            button_6.setInteractive();
            button_6.on('pointerdown', () => {this.mensajeTexto.setText('¡Elegiste pho!');
            button_5.destroy();
            button_6.destroy();
            button_7.destroy();
            button_8.destroy();
            this.mostrar_boton_siguiente()
            });
            button_6.on('pointerover', () => {
            button_6.setTint(0xcccccc);
            });
            button_6.on('pointerout', () => {
            button_6.clearTint(); 
            });
            let button_7 = this.add.image(427, 480, 'pad_thai');
            button_7.setScale(0.5);
            button_7.setInteractive();
            button_7.on('pointerdown', () => {this.mensajeTexto.setText('¡Elegiste pad thai!');
            button_5.destroy();
            button_6.destroy();
            button_7.destroy();
            button_8.destroy();
            this.mostrar_boton_siguiente()
            });
            button_7.on('pointerover', () => {
            button_7.setTint(0xcccccc);
            });
            button_7.on('pointerout', () => {
            button_7.clearTint(); 
            });
            let button_8 = this.add.image(853, 480, 'naengmyeon');
            button_8.setScale(0.5);
            button_8.setInteractive();
            button_8.on('pointerdown', () => {this.puntos+=2;
            this.mensajeTexto.setText('¡Elegiste naengmyeon!');
            button_5.destroy();
            button_6.destroy();
            button_7.destroy();
            button_8.destroy();
            this.mostrar_boton_siguiente()
            });
            button_8.on('pointerover', () => {
            button_8.setTint(0xcccccc);
            });
            button_8.on('pointerout', () => {
            button_8.clearTint(); 
            });            
        }
        else if(this.plato_actual==2)
        {
            let button_9 = this.add.image(427, 240, 'halo-halo');
            button_9.setScale(0.5);
            button_9.setInteractive();
            button_9.on('pointerdown', () => {this.mensajeTexto.setText('¡Elegiste halo halo!');
            button_9.destroy();
            button_10.destroy();
            button_11.destroy();
            button_12.destroy();
            this.mostrar_boton_final()
            });
            button_9.on('pointerover', () => {
            button_9.setTint(0xcccccc);
            });
            button_9.on('pointerout', () => {
            button_9.clearTint(); 
            });
            let button_10 = this.add.image(853, 240, 'ddeok');
            button_10.setScale(0.5);
            button_10.setInteractive();
            button_10.on('pointerdown', () => {this.puntos+=2;
            this.mensajeTexto.setText('¡Elegiste ddeok!');
            button_9.destroy();
            button_10.destroy();
            button_11.destroy();
            button_12.destroy();
            this.mostrar_boton_final()
            });
            button_10.on('pointerover', () => {
            button_10.setTint(0xcccccc);
            });
            button_10.on('pointerout', () => {
            button_10.clearTint(); 
            });
            let button_11 = this.add.image(427, 480, 'mochi');
            button_11.setScale(0.5);
            button_11.setInteractive();
            button_11.on('pointerdown', () => {this.puntos++;
            this.mensajeTexto.setText('¡Elegiste mochi!');
            button_9.destroy();
            button_10.destroy();
            button_11.destroy();
            button_12.destroy();
            this.mostrar_boton_final()
            });
            button_11.on('pointerover', () => {
            button_11.setTint(0xcccccc);
            });
            button_11.on('pointerout', () => {
            button_11.clearTint(); 
            });
            let button_12 = this.add.image(853, 480, 'kuih_lapis');
            button_12.setScale(0.5);
            button_12.setInteractive();
            button_12.on('pointerdown', () => {this.mensajeTexto.setText('¡Elegiste kuih lapis!');
            button_9.destroy();
            button_10.destroy();
            button_11.destroy();
            button_12.destroy();
            this.mostrar_boton_final()
            });
            button_12.on('pointerover', () => {
            button_12.setTint(0xcccccc);
            });
            button_12.on('pointerout', () => {
            button_12.clearTint(); 
            });            
        }
        this.plato_actual++ 
    }
}
