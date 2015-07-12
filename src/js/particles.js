// Animated Constellation background
(function(){
	var canvas = document.querySelector('canvas#particle'),
	    container = document.querySelector('div#particle_container'),
      ctx = canvas.getContext('2d'),
      color = '#aaaaaa';
	canvas.width = container.offsetWidth * 1.2;
	canvas.height = container.offsetHeight * 1.2;
	canvas.style.display = 'block';
	ctx.fillStyle = color;
	ctx.lineWidth = .1;
	ctx.strokeStyle = color;

	var mousePosition = {
		x: canvas.width / 2,
		y: canvas.height / 2
	};

	var dots = {
		nb: (canvas.height * canvas.width) * 0.000065, // arrived at via: original default was 75 dots. On a ~1440 x 800 display, that's 75 pixels out of ~1.15 million. Ratio works out to ~0.000065. Means the number is always prety much always proportionate to the size of the display. Keeps a consistent look across all screen sizes.
		distance: canvas.height * 0.2,
		d_radius: canvas.height * 0.8,
		array: []
	};

	function Dot(){
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;

		this.vx = -.5 + Math.random();
		this.vy = -.5 + Math.random();

		this.radius = Math.random();
	}

	Dot.prototype = {
		create: function(){
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			ctx.fill();
		},

		animate: function(){
			for(i = 0; i < dots.nb; i++){

				var dot = dots.array[i];

				if(dot.y < 0 || dot.y > canvas.height){
					dot.vx = dot.vx;
					dot.vy = - dot.vy;
				}
				else if(dot.x < 0 || dot.x > canvas.width){
					dot.vx = - dot.vx;
					dot.vy = dot.vy;
				}
				dot.x += dot.vx;
				dot.y += dot.vy;
			}
		},

		line: function(){
			for(i = 0; i < dots.nb; i++){
				for(j = 0; j < dots.nb; j++){
					i_dot = dots.array[i];
					j_dot = dots.array[j];

					if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
						if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
							ctx.beginPath();
							ctx.moveTo(i_dot.x, i_dot.y);
							ctx.lineTo(j_dot.x, j_dot.y);
							ctx.stroke();
							ctx.closePath();
						}
					}
				}
			}
		}
	};

	function createDots(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(i = 0; i < dots.nb; i++){
			dots.array.push(new Dot());
			dot = dots.array[i];

			dot.create();
		}

		dot.line();
		dot.animate();
	}
	
	setInterval(createDots, 1000/30);	
})();