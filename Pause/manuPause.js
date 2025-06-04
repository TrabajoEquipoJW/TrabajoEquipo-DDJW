class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  create() {
    this.add.text(400, 300, 'Juego en marcha', {
      fontSize: '32px',
      fill: '#fff'
    }).setOrigin(0.5);

    this.pauseMenu = document.getElementById('pause-menu');
    this.btnResume = document.getElementById('btn-resume');
    this.btnExit = document.getElementById('btn-exit');

    this.input.keyboard.on('keydown-ESC', () => this.togglePause());

    this.btnResume.addEventListener('click', () => {
      this.togglePause();
    });

    this.btnExit.addEventListener('click', () => {
      this.scene.start('index.html');
      this.togglePause(true);
    });

     this.btnToggleSound.addEventListener('click', () => {
      this.soundOn = !this.soundOn;
      this.sound.mute = !this.soundOn;
      this.btnToggleSound.textContent = this.soundOn ? '🔊 Sonido' : '🔇 Sonido';
    });

    this.btnToggleMusic.addEventListener('click', () => {
      this.musicOn = !this.musicOn;
      if (this.music) {
        this.music.setMute(!this.musicOn);
      }
      this.btnToggleMusic.textContent = this.musicOn ? '🎶 Música' : '🔕 Música';
    });
  }

  togglePause(forceClose = false) {
    if (this.scene.isPaused()) {
      this.scene.resume();
      this.pauseMenu.classList.add('hidden');
    } else if (!forceClose) {
      this.scene.pause();
      this.pauseMenu.classList.remove('hidden');
    } else {
      this.pauseMenu.classList.add('hidden');
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MenuScene, MainScene],
  parent: 'game-container',
  backgroundColor: '#000'
};

new Phaser.Game(config);
