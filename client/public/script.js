const joinRoomButton = document.getElementById("join-button")
const messageInput = document.getElementById("message-input")
const roomInput = document.getElementById("room-input")
const form = document.getElementById("form")

form.addEventListener("submit", e => {
    e.preventDefault()
    const message = messageInput.value
    console.log(message)
    const room = roomInput.value
    if(message === "") {
        return
    }
    displayMessage(message)
    messageInput.value = ""
})

joinRoomButton.addEventListener("click", () => {
    const room = roomInput.value
})

function displayMessage(message) {
    const div = document.createElement("div")
    div.textContent = message
    document.getElementById("message-history").append(div)
}