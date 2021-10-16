function Login() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', document.getElementById("wh").value, true);
    xhr.responseType = 'json';

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;

            document.getElementById("webhook_login").classList.toggle("hide")
            document.getElementById("webhook_input").classList.toggle("main")
            document.getElementById("webhook_input").classList.toggle("hide")

            document.getElementById("webhook_name").innerHTML = res.name;
            document.getElementById("webhook_id").innerHTML = res.id;
            document.getElementById("webhook_token").innerHTML = res.token;
            if (res.avatar != null) {
                document.getElementById("webhook_avatar").src = "https://cdn.discordapp.com/avatars/" + res.id + "/" + res.avatar;
            }

        } else if (this.readyState == 4) {
            alert("Invalid Token")
        }
    }
    xhr.send();
}

function send_Message() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', document.getElementById("wh").value, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 204) {
            document.getElementById("message_to_send").innerHTML == "";
            document.getElementById("messages").innerHTML += `
            <div class="message">
                <div class="author">
                    <img src="${document.getElementById("webhook_avatar").src}" alt="">
                </div>
                <div class="message_content">
                    <span>${document.getElementById("webhook_name").innerHTML}</span>
                    <p>${document.getElementById("message_to_send").value}</p>
                </div>
            </div>
        `;
        }
    }

    xhr.send(JSON.stringify({"content": document.getElementById("message_to_send").value}));
}