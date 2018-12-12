/*
* @Author: cuixiaohan
* @Date:   2018-12-12 11:37:32
* @Last Modified by:   cuixiaohan
* @Last Modified time: 2018-12-12 13:43:49
*/


export class Dom  {
	#FONT_SIZE = 14
	#dom = null
	#canvas = null
	#ctx = null
	#blob = null
	#url = null
	constructor(id) {
		// code
		this.#dom = document.getElementById(id)
		console.log(this.#dom)
		if (!this.#dom) {
			throw new Error('dom is null')
			return
		}
		var WIDTH = this.#dom.getClientRects()[0].width;
    	var HEIGHT = this.#dom.getClientRects()[0].height;
    	var data = "<svg xmlns='http://www.w3.org/2000/svg' width='"+WIDTH+"px' height='"+HEIGHT+"px'>" +
            "<foreignObject width='100%' height='100%'>" +
                "<div xmlns='http://www.w3.org/1999/xhtml' style='font: "+this.#FONT_SIZE+"px sans-serif;'>" +
                    this.#dom.innerHTML+
                "</div>" +
            "</foreignObject>" +
        "</svg>";
        var DOMURL = self.URL || self.webkitURL || self;
	    this.#blob = new Blob([data], {type: "image/svg+xml;charset=utf-8"});
	    this.#url = DOMURL.createObjectURL(this.#blob);
	}

	// methods jpeg png
	toBase64(callback) {
	    var a = new FileReader();
	    a.onload = function(e) {callback(e.target.result);}
	    a.readAsDataURL(this.#blob);
	}

	drawToCanvas(id) {
		var WIDTH = this.#dom.getClientRects()[0].width;
    	var HEIGHT = this.#dom.getClientRects()[0].height;
		this.#canvas = document.getElementById(id)
		this.#ctx = this.#canvas.getContext("2d");
		var img = new Image();
		img.onload = () => {
			this.#ctx.drawImage(img, 0, 0)
		}
		img.src = this.#url
		this.#canvas.width = WIDTH;
	    this.#canvas.height= HEIGHT;
	}
}



