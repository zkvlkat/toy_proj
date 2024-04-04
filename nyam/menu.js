const $c = document.querySelector("canvas");
const ctx = $c.getContext(`2d`);
const meunAdd = document.querySelector('#menuAdd');
const product = ["2층학식","1층교식","호식당","맘스터치","꼬밥","모야그집","남경","탕화쿵푸","육회비빔밥",'쇼사돈부리','스시마리오', '역전우동 (역곡역)','메밀꽃', '크라이 치즈버거','학교가는길','승록이네','K관긱식'];
const colors = ["#dc0936", "#e6471d", "#f7a416", 
"#efe61f ", "#60b236", "#209b6c", 
"#169ed8", "#3f297e", "#87207b", 
"#be107f", "#e7167b"];
const result = '';
var count = 0;
//원 그리기
const newMake = () => {
    const [cw,ch] = [$c.width / 2, $c.height / 2];
    const arc = Math.PI / (product.length / 2);

    for(let i = 0 ; i < product.length ; i++){
        ctx.beginPath();
        if(colors.length == 0){
            for(var l=0 ; l < product.length ; l++){
                let r = Math.floor(Math.random()*256);
                let g = Math.floor(Math.random()*256);
                let b = Math.floor(Math.random()*256);
                colors.push("rgb("+r + ","+g+","+b+")");

            }
        }
        ctx.fillStyle = colors[i%(colors.length)];
        ctx.moveTo(cw,ch);
        ctx.arc(cw,ch,cw,arc*(i-1),arc*i);
        ctx.fill();
        ctx.closePath();

    }

    //돌림판 폰트 설정
    ctx.fillStyle = "#fff";
    ctx.font = "18px Pretendard";
    ctx.textAlign = "center";

    for(let i=0;i<product.length;i++){
        const angle = (arc * i)+(arc/2);

        ctx.save();

        ctx.translate(
            cw + Math.cos(angle) * (cw-50),
            ch + Math.sin(angle) * (ch-50)
        );

        ctx.rotate(angle + Math.PI/2);

        product[i].split(" ").forEach((text, j) =>{
            ctx.fillText(text,0,30*j);
            
        })
        ctx.restore();
    }
}

const rotate = () => {
    $c.style.transform = `initial`;
    $c.style.transition = `initial`;
    const alpha = Math.floor(Math.random()*100);

    setTimeout(() => {
        const ran = Math.floor(Math.random()*product.length);
        const arc = 360 / product.length;
        const rotate = (ran * arc) + 3600 + (arc *3) - (arc/4) + alpha;
        $c.style.transform = `rotate(-${rotate}deg)`;
        $c.style.transition = `2s`;
        
        

        //버튼 가져오기
        var button = document.getElementById('gogo');
        var button2 = document.getElementById('add');
        var button3 = document.getElementById('menuAdd');
        button.addEventListener('click', function() {
            count++;
        
        console.log(count);
        //결과 값을 html <div id> 담기
        if(count == 3){
        const resultElement = document.getElementById('result');
        resultElement.textContent = '아니면 '+product[ran]+' 먹자 그냥';
        button.style.display = 'none';
        button2.style.display = 'none';
        button3.style.display = 'none';
        }
    })
    },1);
}



function add(){
if(meunAdd.value != undefined && menuAdd.value != ""){
    product.push(menuAdd.value);
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    colors.push("rgb("+r + ","+g+","+b+")");
    newMake();
    menuAdd.value="";
    }
    else{
        alert("빈칸 ㄴㄴ");
    }
}
newMake();
