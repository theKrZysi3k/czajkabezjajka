document.querySelector(".go").addEventListener('click', async () => {
    var firstname = document.querySelector(".firstname");
    var surname = document.querySelector(".surname");
    var imageInput = document.querySelector(".image");
    var date = document.querySelector(".date");

    if (imageInput.files.length === 0) {
        alert("Proszę wybrać obraz.");
        return;
    }

    var file = imageInput.files[0];

    try {
        // Wczytujemy plik jako base64
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async function () {
            var base64Image = reader.result.split(",")[1]; // Usuwamy prefix

            // Wysyłamy obraz do Imgura
            var response = await fetch("https://api.imgur.com/3/image", {
                method: "POST",
                headers: {
                    Authorization: "bc9ef004b1b3d27", // Zamień "YOUR_CLIENT_ID" na swój Client ID
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    image: base64Image,
                    type: "base64"
                })
            });

            if (!response.ok) {
                throw new Error("Wystąpił błąd podczas przesyłania obrazu na Imgur.");
            }

            var result = await response.json();
            var imageUrl = result.data.link; // URL obrazu na Imgura

            // Przekierowanie z parametrami
            var params = new URLSearchParams();
            params.set("firstname", firstname.value);
            params.set("surname", surname.value);
            params.set("image", imageUrl); // Link do obrazu
            params.set("date", date.value);

            location.href = "id.html?" + params.toString();
        };
    } catch (error) {
        alert("Wystąpił błąd: " + error.message);
    }
});
