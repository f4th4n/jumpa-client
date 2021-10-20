import { initializeState } from './initialize-state'
import { socket } from './channels/index'
import { global } from './global'

initializeState
  .waitForUnity()
  .then(initializeState.setState)
  .then(initializeState.renderState)
  .then(() => {
    socket.start()
    global.start()
  })
  .catch((e) => {
    console.log('e', e)
    //alert(e)
  })
