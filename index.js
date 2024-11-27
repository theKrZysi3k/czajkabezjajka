document.querySelector(".go").addEventListener('click', () => {
    var firstname = document.querySelector(".firstname");
    var surname = document.querySelector(".surname");
    var image = document.querySelector(".image");
    var date = document.querySelector(".date");

    var params = new URLSearchParams();
    params.set("firstname", firstname.value);
    params.set("surname", surname.value);
    params.set("image", image.value);
    params.set("date", date.value);
    location.href = "id.html?" + params;
});