import GameSocket from './socket/game-socket'
import MainScreen from './play/screens/main-screen'

class App {
  start() {
    const gameSocket = new GameSocket()
		const mainScreen = new MainScreen()
    gameSocket.start()
		mainScreen.play()	
  }
}

const app = new App()
window.onload = app.start
