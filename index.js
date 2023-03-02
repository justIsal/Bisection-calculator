let array = [];
const f = (x)=> {
    return 2*x**3+2*x**2-2*x-2;
}
const object = (c,x1,x2,xt,fxn,fxn1,fxt,cek)=>{
    return {
        c,
        x1,
        x2,
        xt,
        fxn,
        fxn1,
        fxt,
        cek
    }
};
const bisection = (x1,x2,xt,e,c)=> {
    let temp = f(xt);
    // console.log(`${c}.x1=${x1.toFixed(6)}|x2=${x2.toFixed(6)}|xt=${xt.toFixed(6)}|f(x1)=${f(x1).toFixed(6)}|f(x2)=${f(x2).toFixed(6)}|f(Xt)=${temp.toFixed(6)} | ${(f(xt.toFixed(6))*f(x1.toFixed(6))<0) ? '-':'+'}`);
    let cek = (f(xt.toFixed(6))*f(x1.toFixed(6))<0) ? '-':'+';
    let a = object(c,x1.toFixed(6),x2.toFixed(6),xt.toFixed(6),f(x1).toFixed(6),f(x2).toFixed(6),temp.toFixed(6),cek);
    array.push(a);
    if(temp > 0 && temp <=e){
        return array.pop();
    }else {
        if(f(x1)*temp == 0){
            console.log("f(xt)ERROR Nilai 0 TERDETEKSI");
            return 0;
        }else if(f(x1)*temp < 0) {
            return bisection(x1,xt,(xt+x1)/2,e,c+1)
        }else if(f(x1)*temp > 0) {
            return bisection(xt,x2,(xt+x2)/2,e,c+1)
        }
    }
}
const makeTodo = (data) => {
    const {c,x1,x2,xt,fxn,fxn1,fxt,cek} = data;
    const getTable = document.createElement('tr');
    getTable.innerHTML = `
                <td>${c}</td>
                <td>${x1}</td>
                <td>${x2}</td>
                <td>${xt}</td>
                <td>${fxn}</td>
                <td>${fxn1}</td>
                <td>${fxt}</td>
                <td>${cek}</td>`
    return getTable;
}
const getForm = document.getElementById('form');
const getSubmit = document.getElementById('submit');
const getClear = document.getElementById('clear');
getSubmit.addEventListener('click',(a)=> {
    a.preventDefault();
    const getX1 = document.getElementById('x1').value,
          getX2 = document.getElementById('x2').value,
          getElement = document.getElementById('tbody'),
          x1 = Number(getX1),x2 = Number(getX2);
    let e = 0.0001;
    if(!(f(x1)*f(x2) < 0)){
        alert(`Nilai f(${x1})*f(${x2}) tidak kurang dari 0, masukan ulang agar nilai f${x1}*f${x2}kurang dari 0`);
    }else {
        let a = bisection(x1,x2,(x1+x2)/2,e,1);
        array.push(a);
        for(const index of array){
            let b = makeTodo(index);
            getElement.append(b);
        }
    }
})
getClear.addEventListener('click',()=> {
    loadData();
})
