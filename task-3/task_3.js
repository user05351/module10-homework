
const wsUrl = "wss://echo.websocket.org/";

const input = document.querySelector('.input');
const btnSend = document.querySelector('.btn-send');
const btnGeo = document.querySelector('.btn-geo');
const chatContainer = document.querySelector('.chat-container');

let websocket;

function createMessage(message) {
    let newElem = document.createElement('p');
    newElem.classList.add('chat-message');
    newElem.innerHTML = message;
    chatContainer.appendChild(newElem);
};

websocket = new WebSocket(wsUrl);

websocket.onmessage = function(evt) {
    createMessage (
        '<span style="color: blue;">RESPONSE: ' + evt.data + '</span>'
    );
};
websocket.onerror = function(evt) {
    createMessage(
        '<span style="color: red;">ERROR:</span> ' + evt.data
    );
};

btnSend.addEventListener('click', () => {
    const message = input.value;
    createMessage(message);
    websocket.send(message);
});

async function geoPosition() {
    const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const long =  position.coords.longitude;
    const lat =  position.coords.latitude;
    chatContainer.innerHTML = `
    <p class="chat-message">
        <a href="https://www.openstreetmap.org/#map=18/${lat}/${long}" target="_blank">
        Ссылка на местоположение
        </a>
    `;
}

btnGeo.addEventListener('click', () => {
    createMessage(geoPosition());
});
