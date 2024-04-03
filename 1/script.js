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
        construcoture() {

        }
        draw() {

        }
        update() {

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
            })

        }
        convertToParticles() {


        }
        render() {

        }
    }


    const effect = new Effect(ctx, canvas.width, canvas.height);
    // effect.wrapText('hello my man');
    // console.log('effect : ', effect);
    function animate() {

    }
})