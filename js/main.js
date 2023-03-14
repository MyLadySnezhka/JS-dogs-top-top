const elDog = document.querySelector('.dog');
const elPlayBoard = document.querySelector('.board');
const elHouse = document.querySelector('.house');
// const elBlock = document.querySelector('.block');
// const elRow = document.querySelector('input[name=rowBlock]');
// const elColumn = document.querySelector('input[name=columnBlock]');
// const elForm = document.querySelector('form');
// const elHtmlRow = document.querySelector('.htmlRow');

let X, Y, Xnew, Ynew;
let Xl, Yt, Xm, Ym, Xr, Yd, Xw, Yh;
let html = '';

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
    Xw = itemLnk.clientWidth;
    Yh = itemLnk.clientHeight;
    Xr = Xl + Xw;
    Yd = Yt + Yh;
    Xm = Xl + Xw/2;
    Ym = Yt + Yh/2;
}

renderStartDog = (itemLnk) => {
    randCoord(itemLnk);
    coordDog(itemLnk);
    Xl = X;
    Yt = Y;
    itemLnk.style.left = `${Xl}px`;
    itemLnk.style.top = `${Yt}px`; 
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
    renderStartDog(elDog);
//console.log(elDog.getBoundingClientRect());
console.log('верхний левый угол старт', Xl, Xm, Yt, Ym);

elPlayBoard.addEventListener('click', (ev) => {
        coordDog(elDog);
        
        mouseX = ev.pageX;
        mouseY = ev.pageY;
        
        if((mouseX>Xl)&&(mouseX<Xm)&&(mouseY>Yt)&&(mouseY<Ym)) {
            console.log('верхний левый угол', Xl, Xm, Yt, Ym);
            Xnew = Xl + Xw/2;
            Ynew = Yt + Yh/2;
            console.log('новое положение', Xnew, Ynew);
        } else if ((mouseX>Xm)&&(mouseX<Xr)&&(mouseY>Yt)&&(mouseY<Ym)) {
            console.log('верхний правый угол');
            Xnew = Xl - Xw/2;
            Ynew = Yt + Yh/2;
        } else if ((mouseX>Xl)&&(mouseX<Xm)&&(mouseY>Ym)&&(mouseY<Yd)) {
            console.log('нижний левый угол');
            Xnew = Xl + Xw/2;
            Ynew = Yt - Yh/2;
        } else if ((mouseX>Xm)&&(mouseX<Xr)&&(mouseY>Ym)&&(mouseY<Yd)) {
            console.log('нижний правый угол');
            Xnew = Xl - Xw/2;
            Ynew = Yt - Yh/2;
        }

        if ((Xnew>0)&&(Xnew<(borderX-Xw))&&(Ynew>0)&&(Ynew<(borderY-Yh))) {
            Xl = Xnew;
            Yt = Ynew;
            renderDog(Xl, Yt, elDog);
        };
})


