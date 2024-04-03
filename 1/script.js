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

    ctx.strokeStyle = 'orange';
    ctx.fillStyle = 'green';
    ctx.font = '30px Helvetica';
    ctx.textAlign = 'center';

    // ctx.fillText(text, textX, textY);
    // ctx.strokeText(text, textX, textY);
    
    const maxTextWidth = canvas.width / 5;
    const lineHeight = 80; // 간격을 변수 하나로 지정해서 다루려고 함

    function wrapText(text) {
        let linesArray = [];
        let lineCounter = 0;
        let line = '';
        let words = text.split(' ');
        
        for (let i = 0; i < words.length; i ++) {
            let testLine = line + words[i] + ' ';
            if (ctx.measureText(testLine).width > maxTextWidth) {
                linesArray.push(testLine);
                lineCounter ++;
            } else {
                line = testLine;
            }
        }
        
        let textHeight = lineHeight + lineCounter;
        let textY = canvas.height/2 - textHeight/2;

        linesArray.forEach((item, idx) => {
            ctx.fillText(item, textX, textY + (idx * lineHeight));
        })
    }


    let scanner = document.querySelector('#scanner');
    scanner.addEventListener('keyup', (e) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let inputText = e.target.value;
        wrapText(inputText);
    });
})