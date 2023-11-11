let profilePic = document.getElementById("profile-pic")
let inputFile = document.getElementById("input-file")

inputFile.onchange = function () {
    profilePic.style.display = "block"
    profilePic.src = URL.createObjectURL(inputFile.files[0])
}

const textArea = document.querySelector('#default');
const btnSubmit = document.querySelector(".btnSubmit")
const titlePost = document.querySelector('.titlePost')
btnSubmit.addEventListener('click', () =>{
    const title = titlePost.value;
    let data = tinymce.get('default').getContent();
    
});