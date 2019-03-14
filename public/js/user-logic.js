function delPost(id){
    const url = `/post/${id}`
    fetch(url,{
        method: 'delete'
    })
    .then( () => window.location.href = '/' );
    // alert(url);
}
//select post to delete
const delBtn = document.querySelectorAll('#delete');
delBtn.forEach(item => item.onclick = () => delPost(item.dataset.index) );

//select post to like
const lkPost = document.querySelector('#like');
lkPost.onclick = () => likepost(lkPost.dataset.id);
function likepost(id){
    const url = `/like/${id}`
    fetch(url, {
        method: 'post'
    }).then( window.location.href = `/readpost/${id}`);
   // console.log(url)
}

//select post to dislike
const dlkPost = document.querySelector('#dislike');
dlkPost.onclick = () => dlikepost(dlkPost.dataset.id);
function dlikepost(id){
    const url = `/dislike/${id}`
    fetch(url, {
        method: 'post'
    }).then( window.location.href = `/readpost/${id}`);
    //console.log(url)
}