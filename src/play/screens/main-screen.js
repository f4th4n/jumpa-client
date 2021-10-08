import LevelScene from '../../scenes/main-screen/level-scene'

class MainScreen {
  play() {
    cc.game.onStart = this.onStart
    cc.game.run('gameCanvas')
  }

  onStart() {
    // load resources
    cc.LoaderScene.preload(
      ['./assets/images/HelloWorld.png'],
      () => cc.director.runScene(new LevelScene()),
      this
    )
  }
}

export default MainScreen
