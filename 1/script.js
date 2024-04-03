window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height); // moveTo는 끝나는 좌표
    ctx.lineTo(canvas.width / 2, 0);             // lineTo는 시작하는 좌표
    ctx.stroke();
    
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height/2);
    ctx.lineTo(0, canvas.height/2);
    ctx.stroke();
 
    // const text = '...asdasadsdasdasadsadsdasdasadsadsdasdasadsadsdasdasadsadsdas';
    const textX = canvas.width / 2;
    const textY = canvas.height / 2;

    console.log(ctx);

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            this.x = Math.random() * this.effect.canvasWidth;
            this.y = 0;
            this.color = color;
            this.originX = x;
            this.originY = y;
            this.size = this.effect.gap - 1;
            this.dx = 0;
            this.dy = 0;
            this.vx = 0;
            this.vy = 0;
            this.force = 0;
            this.angle = 0;
            this.distance = 0;
            this.friction = Math.random() * 0.6 + 0.15;
            this.ease = Math.random() * 0.1 + 0.005;
        }
        draw() {
            this.effect.context.fillStyle = this.color;
            this.effect.context.fillRect(this.x, this.y, this.size, this.size);
        }
        update() {
            this.x += (this.originX - this.x) * this.ease;
            this.y += (this.originY - this.y) * this.ease;
        }
    }

    class Effect {
        constructor(context, canvasWidth, canvasHeight) {
            this.context = context;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;
            this.fontSize = 80;
            this.lineHeight = this.fontSize * 0.8;
            this.maxTextWidth = this.canvasWidth * 0.8;
            this.textInput = document.getElementById('scanner');
            this.textInput.addEventListener('keyup', (e) => {
                this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
                this.wrapText(e.target.value);
            });
            this.particles = [];
            this.gap = 5;
            this.mouse = {
                radius: 20000,
                x: 0,
                y: 0
            }
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            });
        }
        wrapText(text) {
            const gradient = this.context.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0.3, 'red');
            gradient.addColorStop(0.5, 'orange');
            gradient.addColorStop(0.7, 'yellow');
            
            this.context.textAlign = 'center';
            this.context.strokeStyle = 'white';
            this.context.textBaseline = 'middle';
            this.context.fillStyle = gradient;
            this.context.font = `${this.fontSize}px Helvetica`;
            this.context.textAlign = 'center';

            let linesArray = [];
            let words = text.split(' ');
            let lineCounter = 0;
            let line = '';
            for (let i = 0; i < words.length; i++) {
                let testLine = line + words[i] + ' ';
                if (this.context.measureText(testLine).width > this.maxTextWidth) {
                    line = words[i] + ' ';
                    lineCounter ++;
                } else {
                    line = testLine;
                }
                linesArray[lineCounter] = line;
            }
            let textHeight = this.lineHeight * lineCounter;
            this.textY = this.canvasHeight / 2 - textHeight / 2;
            linesArray.forEach((el, index) => {
                this.context.fillText(el, this.textX, this.textY + (index * this.lineHeight));
                this.context.strokeText(el, this.textX, this.textY + (index * this.lineHeight));
            });

            this.convertToParticles();
        }
        convertToParticles() {
            this.particles = [];
            const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            // gap is how much jump to
            // ref : gap.png
            for (let y = 0; y < this.canvasHeight; y += this.gap){
                for (let x = 0; x < this.canvasWidth; x += this.gap){
                    const index = (y * this.canvasWidth + x) * 4;
                    const alpha = pixels[index + 3];
                    if (alpha > 0) {
                        const red = pixels[index];
                        const green = pixels[index + 1];
                        const blue = pixels[index + 2];
                        const color = `rgb( ${red}, ${green},${blue})`;
                        this.particles.push(new Particle(this, x, y, color));
                    }
                }
            }
            // 하나당 픽셀 하나의 값을 의미함.
            console.log(this.particles);

        }
        render() {
            this.particles.forEach(particle => {
                particle.update();
                particle.draw();
            })
        }
    }


    const effect = new Effect(ctx, canvas.width, canvas.height);
    effect.wrapText('똥꼬 보고싶어~~');
    effect.render();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        effect.render();
        requestAnimationFrame(animate);
    }
    animate();
})