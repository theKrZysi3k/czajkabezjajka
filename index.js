document.querySelector(".go").addEventListener('click', () => {
    var firstname = document.querySelector(".firstname");
    var surname = document.querySelector(".surname");
    var imageInput = document.querySelector(".image");
    var date = document.querySelector(".date");

    if (imageInput.files.length === 0) {
        alert("Proszę wybrać obraz.");
        return;
    }

    var file = imageInput.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var imageBase64 = event.target.result;
        var params = new URLSearchParams();
        params.set("firstname", firstname.value);
        params.set("surname", surname.value);
        params.set("image", imageBase64); 
        params.set("date", date.value);

        location.href = "id.html?" + params.toString();
    };

    reader.readAsDataURL(file);
});
