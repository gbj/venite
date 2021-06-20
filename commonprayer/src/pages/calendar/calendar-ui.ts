const CalendarService = (await import("./calendar-service.js")).default;

const dateField = document.getElementById("date");

dateField.onchange = async (ev) => {
  const day = await CalendarService.findDay(ev.target.value, "bcp1979");
  document.getElementById("date-output").innerHTML = JSON.stringify(day);
};

const now = new Date();
dateField.value = `${now.getFullYear()}-${(now.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
const day = await CalendarService.findDay(dateField.value, "bcp1979");
document.getElementById("date-output").innerHTML = JSON.stringify(day);
