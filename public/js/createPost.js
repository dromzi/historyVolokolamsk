let profilePic = document.querySelector(".profile-pic")
let inputFile = document.getElementById("input-file")

inputFile.onchange = function () {
    profilePic.style.display = "block"
    profilePic.src = URL.createObjectURL(inputFile.files[0])
}

const textArea = document.querySelector('#default');
const btnSubmit = document.querySelector(".btnSubmit")
const titlePost = document.querySelector('.titlePost')
// const userId = localStorage.getItem('userId');
btnSubmit.addEventListener('click', async () =>{
    const userId = localStorage.getItem('userId');
    const title = titlePost.value;
    let text = tinymce.get('default').getContent();
    const imgPost = inputFile.files[0] ? inputFile.files[0] : "img/userimage.png"
    // console.log(title);
    // console.log(text);
    // console.log(userId);
    // console.log(imgPost);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    formData.append('userId', userId);
    formData.append('imgPost', imgPost);


    const response = await fetch('/createPost', {
        method: 'POST',
        body: formData
    });
    if(response.ok) {
        window.location.href = '/';
    } else {
        document.documentElement.innerHTML = 'Ошибка'
    }


});