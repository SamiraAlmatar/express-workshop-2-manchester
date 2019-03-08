const deletePost = postIndex => {
    const fullDeleteUrl = `/post/${postIndex}`;

    fetch(fullDeleteUrl, {
        method: "DELETE"
    }).then(res => {
        // console.log('all done', res);
        location.reload();
    })
}

const deleteButtons = document.querySelectorAll('.delete-post');

deleteButtons.forEach(element => {
    element.onclick = () => deletePost(element.dataset.index);
});