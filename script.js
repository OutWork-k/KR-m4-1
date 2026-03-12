const regExp = /^\d+$/;

const containsOnlyDigits = (str) => {
    return regExp.test(str);
}

console.log(containsOnlyDigits("12345")); 
console.log(containsOnlyDigits("12a45")); 

const Message = () => {
    console.log("Прошла секунда");
}

setInterval(Message, 1000);

const count = () => {
    let i = 1;

    const interval = setInterval(() => {
        console.log(i);
        i++;

        if (i > 10) {
            clearInterval(interval);
        }
    }, 1000);
}
count();

const btnStart = document.querySelector("#start")
const btnStop = document.querySelector("#stop")
const btnReset = document.querySelector("#reset")
const timer = document.querySelector("#timer")

let time = 10;
let interval = null;
timer.textContent = time;

btnStart.onclick = () => {
    if (interval) return;

    interval = setInterval(() => {
        time--;
        timer.textContent = time;

        if (time === 0) {
            clearInterval(interval);
            interval = null;
        }
    }, 1000);
};
btnStop.onclick = () => {
    clearInterval(interval);
    interval = null;
};

btnReset.onclick = () => {
    clearInterval(interval);
    interval = null;
    time = 10;
    timer.textContent = time;
};

const box = document.querySelector("#box");

box.addEventListener("click", () => {
    box.classList.toggle("active");
});

const request = new XMLHttpRequest
request.open('GET','./two.json')
request.setRequestHeader('Content-Type', 'application/json')
request.send()
request.onload = () => {
    const response = JSON.parse(request.response)
    console.log(response);

}

const input = document.querySelector("#loginInput");
const button = document.querySelector("#checkBtn");
const userCard = document.querySelector("#userCard");
const message = document.querySelector("#message");

let users = [];
fetch("./users.json")
  .then(response => response.json())
  .then(data => {
    users = data;
  })
  .catch(error => {
    console.error("Ошибка при загрузке JSON:", error);
  });

button.addEventListener("click", () => {
    const login = input.value.trim();
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "users.json", true);
    xhr.onload = () => {
        const users = JSON.parse(xhr.responseText);
        const user = users.find(u => u.login === login);

        if (user) {
            message.textContent = "";
            userCard.innerHTML = `
                <div style="border:1px solid #000; padding:10px; width:200px; margin-top:10px;">
                    <h3>${user.login}</h3>
                    <p>Роль: ${user.role}</p>
                    <p>Email: ${user.email}</p>
                </div>
            `;
        } else {
            userCard.innerHTML = "";
            message.textContent = "Пользователь не найден";
        }
    };
    xhr.send();
});
// вот это задание не возьможно сделать 