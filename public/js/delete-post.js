function delPost(id){
    const url = `/post/${id}`
    fetch(url,{
        method: 'delete'
    })
    .then( () => window.location.href = '/' );
    // alert(url);
}

const delBtn = document.querySelectorAll('#delete');
delBtn.forEach(item => item.onclick = () => delPost(item.dataset.index) );
//delBtn.addEventListener('click', delPost(delBtn.dataset.index))