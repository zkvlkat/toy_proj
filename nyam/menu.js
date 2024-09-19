(function() {
    const $c = document.querySelector("canvas");
    const ctx = $c.getContext(`2d`);
    const menuAdd = document.querySelector('#menuAdd');
    const product = ["꽝"];
    const colors = ["#dc0936", "#e6471d", "#f7a416", 
    "#efe61f ", "#60b236", "#209b6c", 
    "#169ed8", "#3f297e", "#87207b", 
    "#be107f", "#e7167b"];
    let result = '';

    const newMake = () => {
        const [cw, ch] = [$c.width / 2, $c.height / 2];
        const arc = Math.PI / (product.length / 2);

        ctx.clearRect(0, 0, $c.width, $c.height);

        for(let i = 0; i < product.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = colors[i % colors.length];
            ctx.moveTo(cw, ch);
            ctx.arc(cw, ch, cw, arc * i, arc * (i + 1));
            ctx.fill();
            ctx.closePath();
        }

        ctx.fillStyle = "#fff";
        ctx.font = "18px Pretendard";
        ctx.textAlign = "center";

        for(let i = 0; i < product.length; i++) {
            const angle = (arc * i) + (arc / 2);
            ctx.save();
            ctx.translate(
                cw + Math.cos(angle) * (cw - 50),
                ch + Math.sin(angle) * (ch - 50)
            );
            ctx.rotate(angle + Math.PI / 2);
            product[i].split(" ").forEach((text, j) => {
                ctx.fillText(text, 0, 30 * j);
            });
            ctx.restore();
        }
    }

    window.rotate = function() {
        $c.style.transform = `initial`;
        $c.style.transition = `initial`;

        setTimeout(() => {
            const totalDegrees = 3600; 
            const degreesPerItem = 360 / product.length;
            const randomIndex = Math.floor(Math.random() * product.length);
            const randomOffsetDegrees = Math.random() * degreesPerItem;
            const rotateDegrees = totalDegrees + (randomIndex * degreesPerItem) + randomOffsetDegrees;

            $c.style.transform = `rotate(-${rotateDegrees}deg)`;
            $c.style.transition = `5s cubic-bezier(0.25, 0.1, 0.25, 1)`;

            setTimeout(() => {
                result = product[randomIndex];
                const resultElement = document.getElementById('result');
                resultElement.textContent = `결과: ${result}`;
            }, 5000); 

        }, 0);
    }

    window.add = function() {
        if(menuAdd.value != undefined && menuAdd.value != "") {
            product.push(menuAdd.value);
            newMake();
            menuAdd.value = "";
        } else {
            alert("값을 입력해주세요.");
        }
    }

    newMake();

})();
