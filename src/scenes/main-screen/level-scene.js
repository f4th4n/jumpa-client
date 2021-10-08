import helper from '../../helper'
import char from '../../components/char'

const LevelScene = cc.Scene.extend({
  onEnter: function () {
    this._super()
    const size = cc.director.getWinSize()

    const sprite = cc.Sprite.create('./assets/images/HelloWorld.png')
    sprite.setPosition(size.width / 2, size.height / 2)
    sprite.setScale(0.8)
    this.addChild(sprite, 0)

		/*
    const label = cc.LabelTTF.create('Test test', 'Arial', 40)
    label.setPosition(size.width / 2, size.height / 2)
    this.addChild(label, 1)
		*/

		// start from here
		const char = cc.Sprite.create('./assets/images/circle.png')
		char.setPosition(size.width / 2, size.height / 2)
		console.log(char.getPosition())
		window.char = char
		char.schedule(() => {
			//console.log('test', +new Date())
			char.setPositionX(char.getPositionX() + 1)
		}, helper.frameSchedule)
		this.addChild(char)
  },
})

export default LevelScene
