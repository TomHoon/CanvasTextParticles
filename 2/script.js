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
/**
 * 1. clinetWidth를 계산
 * 2. measureText를 이용해 width보다 크면 배열에 담기
 * 3.   width보다 작으면 계속해서 한줄로 가야되니 line 변수에 담기
 * 4. 배열 요소마다 한줄이니 y좌표를 일정하게 늘려줘야한다(ctx.fillText(텍스트, x좌표, y좌표)
 */
    function wrapText(text) {
        let linesArray = [];
        let lineCounter = 0;
        let line = '';
        let words = text.split(' ');
        
        for (let i = 0; i < words.length; i ++) {
            let testLine = line + words[i] + ' ';
            if (ctx.measureText(testLine).width > maxTextWidth) {
                console.log('111 ');
                linesArray.push(testLine);
                lineCounter ++;
            } else {
                console.log('222 ');
                line = testLine;
            }
        }

        linesArray.forEach((item, idx) => {
            ctx.fillText(item, textX, textY + idx * 20);
        })
    }

    wrapText('aaaaaaaaa aaaa aaaaaaaaaaaaaaaaaaa aa')
})