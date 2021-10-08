const char = cc.Class({
  extends: cc.Component,

  properties: {},

  // Use this for initialization
  onLoad: function () {},

  // Called every frame, uncomment this function to activate update callback
	update: function (dt) {
		console.log('ff', +new Date())
	},
})

console.log('char')
export default char
