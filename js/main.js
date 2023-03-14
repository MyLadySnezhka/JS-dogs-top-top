const elDog = document.querySelector('.dog');
const elPlayBoard = document.querySelector('.board');
const elHouse = document.querySelector('.house');
const elBlock = document.querySelector('.block');
const elRow = document.querySelector('input[name=rowBlock]');
const elColumn = document.querySelector('input[name=columnBlock]');
const elForm = document.querySelector('form');
const elHtmlRow = document.querySelector('.htmlRow');

let X, Y;
let Xl, Yt, Xm, Ym, Xr, Yd, Xw, Yh;
let html = '';

//розмір ігрового поля
console.log('Поле:', elPlayBoard.clientHeight, elPlayBoard.clientWidth);

const blockWidth = elBlock.clientWidth;
const blockHeight = elBlock.clientHeight;

elPlayBoard.style.height = '800px';
elPlayBoard.style.width = '1200px';

const randCoord = (itemLnk) => {
    let maxX = elPlayBoard.clientWidth - itemLnk.clientWidth;
    let maxY = elPlayBoard.clientHeight - itemLnk.clientHeight;
    X = Math.floor(Math.random()*maxX);
    Y = Math.floor(Math.random()*maxY);
}

const coordDog = (itemLnk) => {
    randCoord(itemLnk);
    Xw = itemLnk.clientWidth;
    Yh = itemLnk.clientHeight;
    Xl = X;
    Yt = Y;
    Xr = X + Xw;
    Yd = Y + Yh;
    Xm = X + Xw/2;
    Ym = Y + Yh/2;
}

renderDog = (itemLnk) => {
    coordDog(itemLnk);
    itemLnk.style.left = `${Xl}px`;
    itemLnk.style.top = `${Yt}px`; 
}

renderHouse = (itemLnk) => {
    randCoord(itemLnk);
    itemLnk.style.left = `${X}px`;
    itemLnk.style.top = `${Y}px`;
}

elForm.addEventListener('submit', (ev) => {   
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const row = formData.get('rowBlock');
    const column = formData.get('columnBlock');
    elPlayBoard.style.height = `${row*blockHeight}px`;
    elPlayBoard.style.width = `${column*blockWidth}px`;
        for(let i=1; i<=column; i++) {
            html = html + '<div class="block"></div>';
        };
        let renderRow = `<div class="htmlRow">${html}</div>`;
        for(let j=1; j<=row; j++) {
            elPlayBoard.insertAdjacentHTML('beforeend', renderRow);
        }
    renderHouse(elHouse);
    renderDog(elDog);
})


//console.log(elDog.getBoundingClientRect());

elPlayBoard.addEventListener('click', (ev) => {
               
        mouseX = ev.pageX;
        mouseY = ev.pageY;
        
        if((mouseX>Xl)&&(mouseX<Xm)&&(mouseY>Yt)&&(mouseY<Ym)) {
            console.log('верхний левый угол');
            elDog.style.left = `${Xl + Xw}px`;
            elDog.style.top = `${Yt + Yh}px`;
        } else if ((mouseX>Xm)&&(mouseX<Xr)&&(mouseY>Yt)&&(mouseY<Ym)) {
            console.log('верхний правый угол');
            elDog.style.left = `${Xl - Xw}px`;
            elDog.style.top = `${Yt + Yh}px`;
        } else if ((mouseX>Xl)&&(mouseX<Xm)&&(mouseY>Ym)&&(mouseY<Yd)) {
            console.log('нижний левый угол');
            elDog.style.left = `${Xl + Xw}px`;
            elDog.style.top = `${Yt - Yh}px`;
        } else if ((mouseX>Xm)&&(mouseX<Xr)&&(mouseY>Ym)&&(mouseY<Yd)) {
            console.log('нижний правый угол');
            elDog.style.left = `${Xl - Xw}px`;
            elDog.style.top = `${Yt - Yh}px`;
        }

        //придумать, чем заменить
        //renderDog(elDog);
})


