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
 
    const text = '...';
    const textX = canvas.width / 2;
    const textY = canvas.height / 2;

    console.log(ctx);

    ctx.strokeStyle = 'orange';
    ctx.fillStyle = 'white';
    ctx.font = '80px Helvetica';
    ctx.textAlign = 'center';

    ctx.fillText(text, textX, textY);
    ctx.strokeText(text, textX, textY);

})