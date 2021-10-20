mergeInto(LibraryManager.library, {	
	StartJS: function() {
		console.log('start js')
		setTimeout(function() {
			const name = 'tas tas'//ff.models.playerModel.currentPlayer._value.nick
			console.log('before', name)
			window.unityInstance.SendMessage('Player', 'TryTry', name);
			console.log('after')
		}, 1000)
	},

  GetCurrentPlayerName: function () {
    //window.alert("Hello, world!");
		return "YOI MEN";
  },

  HelloString: function (str) {
    window.alert(Pointer_stringify(str));
  },

  PrintFloatArray: function (array, size) {
    for(var i = 0; i < size; i++)
    console.log(HEAPF32[(array >> 2) + i]);
  },

  AddNumbers: function (x, y) {
    return x + y;
  },

  StringReturnValueFunction: function () {
    var returnStr = "bla";
    var bufferSize = lengthBytesUTF8(returnStr) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(returnStr, buffer, bufferSize);
    return buffer;
  },

  BindWebGLTexture: function (texture) {
    GLctx.bindTexture(GLctx.TEXTURE_2D, GL.textures[texture]);
  },

});
