const elDog = document.querySelector('.dog');
const elPlayBoard = document.querySelector('.board');
const elHouse = document.querySelector('.house');
const elCat = document.querySelector('.cat');
const gameOverText = document.querySelector('.atCat');
// const elBlock = document.querySelector('.block');
// const elRow = document.querySelector('input[name=rowBlock]');
// const elColumn = document.querySelector('input[name=columnBlock]');
// const elForm = document.querySelector('form');
// const elHtmlRow = document.querySelector('.htmlRow');

let X, Y, xNew, yNew;
let xLeft, yTop, xMid, yMid, xRight, yDown, xWidth, yHeight;
let html = '';
let houseX, houseY;
let catX, catY;


//розмір ігрового поля
const borderX = elPlayBoard.clientWidth;
const borderY = window.innerHeight;
console.log('Поле:', borderX, borderY);

//розмір клітин, на які хотіла поділити поле
// const blockWidth = elBlock.clientWidth;
// const blockHeight = elBlock.clientHeight;

// elPlayBoard.style.height = '800px';
// elPlayBoard.style.width = '1200px';
// elBlock.style.height = '100px';
// elBlock.style.width = '100px';

const randCoord = (itemLnk) => {
    let maxX = borderX - itemLnk.clientWidth;
    let maxY = borderY - itemLnk.clientHeight;
    X = Math.floor(Math.random()*maxX);
    Y = Math.floor(Math.random()*maxY);
}

const coordDog = (itemLnk) => {
    xWidth = itemLnk.clientWidth;
    yHeight = itemLnk.clientHeight;
    xRight = xLeft + xWidth;
    yDown = yTop + yHeight;
    xMid = xLeft + xWidth/2;
    yMid = yTop + yHeight/2;
}

renderStartDog = (itemLnk) => {
    randCoord(itemLnk);
    coordDog(itemLnk);
    xLeft = X;
    yTop = Y;
    itemLnk.style.left = `${xLeft}px`;
    itemLnk.style.top = `${yTop}px`; 
}

renderDog = (X , Y, itemLnk) => {
    coordDog(itemLnk);
    itemLnk.style.left = `${X}px`;
    itemLnk.style.top = `${Y}px`;
}

renderHouse = (itemLnk) => {
    randCoord(itemLnk);
    itemLnk.style.left = `${X}px`;
    itemLnk.style.top = `${Y}px`;
    houseX = X;
    houseY = Y;
}

renderCat = (itemLnk) => {
    randCoord(itemLnk);
    itemLnk.style.left = `${X}px`;
    itemLnk.style.top = `${Y}px`;
    catX = X;
    catY = Y;
}

//спроба намалювати дошку з клітинками
//не дороблено: треба прибирати перший квадрат та взагалі чистити поле, або хоча б прибирати інпути після рендеру дошки
// elForm.addEventListener('submit', (ev) => {   
//     ev.preventDefault();
//     const formData = new FormData(ev.target);
//     const row = formData.get('rowBlock');
//     const column = formData.get('columnBlock');
//     elPlayBoard.style.height = `${row*blockHeight}px`;
//     elPlayBoard.style.width = `${column*blockWidth}px`;
//         for(let i=1; i<=column; i++) {
//             html = html + '<div class="block"></div>';
//         };
//         let renderRow = `<div class="htmlRow">${html}</div>`;
//         for(let j=1; j<=row; j++) {
//             elPlayBoard.insertAdjacentHTML('beforeend', renderRow);
//         }
    
//     renderHouse(elHouse);
//     renderDog(elDog);
// })

    renderHouse(elHouse);
    console.log('House:', houseX, houseY);
    renderCat(elCat);
    console.log('Cat:', catX, catY);

    renderStartDog(elDog);
//console.log(elDog.getBoundingClientRect());
//console.log('верхний левый угол старт', xLeft, xMid, yTop, yMid);

elPlayBoard.addEventListener('click', (ev) => {
        coordDog(elDog);
        
        mouseX = ev.pageX;
        mouseY = ev.pageY;
        
        if((mouseX>xLeft)&&(mouseX<xMid)&&(mouseY>yTop)&&(mouseY<yMid)) {
            console.log('верхний левый угол', xLeft, xMid, yTop, yMid);
            xNew = xLeft + xWidth/2;
            yNew = yTop + yHeight/2;
            console.log('новое положение', xNew, yNew);
        } else if ((mouseX>xMid)&&(mouseX<xRight)&&(mouseY>yTop)&&(mouseY<yMid)) {
            console.log('верхний правый угол');
            xNew = xLeft - xWidth/2;
            yNew = yTop + yHeight/2;
            console.log('новое положение', xNew, yNew);
        } else if ((mouseX>xLeft)&&(mouseX<xMid)&&(mouseY>yMid)&&(mouseY<yDown)) {
            console.log('нижний левый угол');
            xNew = xLeft + xWidth/2;
            yNew = yTop - yHeight/2;
            console.log('новое положение', xNew, yNew);
        } else if ((mouseX>xMid)&&(mouseX<xRight)&&(mouseY>yMid)&&(mouseY<yDown)) {
            console.log('нижний правый угол');
            xNew = xLeft - xWidth/2;
            yNew = yTop - yHeight/2;
            console.log('новое положение', xNew, yNew);
        }

        //перевірка, чи не вийшов за межі поля
        if ((xNew>=0)&&(xNew<=(borderX-xWidth))&&(yNew>=0)&&(yNew<=(borderY-yHeight))) {
            xLeft = xNew;
            yTop = yNew;
        } else {if(xNew<=0) {xLeft = 1};
               if(xNew>(borderX-xWidth)) {xLeft = borderX-xWidth};
               if(yNew<=0) {yTop = 1};
               if(yNew>borderY-yHeight) {yTop=borderY-yHeight};
            }  
            renderDog(xLeft, yTop, elDog);

        //чи зайшов додому    
        if((xLeft>=houseX-50)&&(xLeft<=houseX+80)&&(yTop>=houseY-50)&&(yTop<=houseY+120)) {
            elPlayBoard.innerHTML = `<span class="atHome">Вітаю, цуценя вдома!<br>Якщо хочеш зіграти ще, онови сторінку.</span>`;
        }

        //чи натрапив на кота
        if((xLeft>=catX-50)&&(xLeft<=catX+160)&&(yTop>=catY-50)&&(yTop<=catY+160)) {
            //elPlayBoard.innerHTML = `<span class="atCat">МЯУ!!!<br>Не треба ображати кицьку!!!<br><br>Якщо хочеш зіграти ще, онови сторінку.</span>`;
            //elPlayBoard.classList.add('atCat');
            gameOverText.style.display = 'block';
        }
})


