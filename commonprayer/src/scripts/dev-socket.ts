console.log("Trying to connect to dev server.");
const ws = new WebSocket("ws://localhost:8001");

ws.onopen = function () {
  console.log("Connected to dev server");
};
ws.onclose = function () {
  console.log("Disconnected from dev server");
};
ws.onmessage = function (event) {
  if (event.data === "Refresh") {
    window.location.reload(true);
  }
};
