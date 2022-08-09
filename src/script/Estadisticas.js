import { isLogged } from "./Global.js";
const $ = (element) => document.querySelector(element);
const btnBack = $(".arrowback");
const select = $(".select");
if (!isLogged()) {
  window.location.href = "/src/index.html";
}
btnBack.addEventListener("click", () => {
  window.location.href = "/src/pages/gameUser.html";
});
const idUserIn = JSON.parse(localStorage.getItem("userIN"));
const localUsers = JSON.parse(localStorage.getItem("users"));
const NewUsers = JSON.parse(localStorage.getItem("newUsers"));
const allUsers = [...localUsers, ...NewUsers];
function getData() {
  const user = allUsers.find((e) => {
    return e.id === idUserIn;
  });
  return user.matches.map((e) => e.match);
}
console.log("data extraida", getData());
//----------------------------------------------------------------------------------------------//
// const data = [
//   {
//     energiasRecogidas: 23,
//     salasLimpiadas: 5,
//     powerUpsRecogidos: 25,
//     fecha: "Sat Aug 06 2022 11:55:09 GMT-0500",
//   },
//   {
//     energiasRecogidas: 23,
//     salasLimpiadas: 1,
//     powerUpsRecogidos: 5,
//     fecha: "Sat Aug 07 2022 11:55:09 GMT-0500",
//   },
//   {
//     energiasRecogidas: 23,
//     salasLimpiadas: 20,
//     powerUpsRecogidos: 35,
//     fecha: "Sat Aug 08 2022 11:55:09 GMT-0500",
//   },
//   {
//     energiasRecogidas: 23,
//     salasLimpiadas: 12,
//     powerUpsRecogidos: 35,
//     fecha: "Sat Aug 08 2022 11:55:09 GMT-0500",
//   },
//   {
//     energiasRecogidas: 23,
//     salasLimpiadas: 12,
//     powerUpsRecogidos: 35,
//     fecha: "Sat Aug 08 2022 11:55:09 GMT-0500",
//   },
//   {
//     energiasRecogidas: 23,
//     salasLimpiadas: 12,
//     powerUpsRecogidos: 35,
//     fecha: "Sat Aug 08 2022 11:55:09 GMT-0500",
//   },
//   {
//     energiasRecogidas: 23,
//     salasLimpiadas: 12,
//     powerUpsRecogidos: 35,
//     fecha: "Sat Aug 08 2022 11:55:09 GMT-0500",
//   },
//   {
//     energiasRecogidas: 23,
//     salasLimpiadas: 12,
//     powerUpsRecogidos: 35,
//     fecha: "Sat Aug 08 2022 11:55:09 GMT-0500",
//   },
//   {
//     energiasRecogidas: 23,
//     salasLimpiadas: 12,
//     powerUpsRecogidos: 35,
//     fecha: "Sat Aug 08 2022 11:55:09 GMT-0500",
//   },
//   {
//     energiasRecogidas: 23,
//     salasLimpiadas: 12,
//     powerUpsRecogidos: 35,
//     fecha: "Sat Aug 08 2022 11:55:09 GMT-0500",
//   },
// ];
const data = getData();
const dataSet = {
  cleanRooms: {
    backgroundColor: "#0983AF",
    label: "Salas Limpiadas",
    data: [],
    hidden: false,
  },
  powerUps: {
    backgroundColor: "#46BC8B",
    label: "Power Ups recogidos",
    data: [],
    hidden: false,
  },
  energies: {
    backgroundColor: "#951F5F",
    label: "Energias recogidas",
    data: [],
    hidden: false,
  },
};

const chartElement = document.getElementById("myChart");
const myChart = new Chart(chartElement, {
  type: "bar",
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    borderRadius: 3,
  },
});

const getDataSet = (show) => {
  if (show !== undefined) {
    Object.keys(dataSet).map((key) => {
      dataSet[key].hidden = show === "indicadores" ? false : key !== show;
    });
  }
  let games = [];
  data.map((game, i) => {
    dataSet.energies.data.push(game.energies);
    dataSet.powerUps.data.push(game.powerUps);
    dataSet.cleanRooms.data.push(game.cleanRooms);
    games.push((i + 1).toString());
  });
  myChart.data.datasets = Object.values(dataSet);
  myChart.data.labels = games;
  myChart.update();
};

getDataSet();

// const handleInputChange = (e) => {
//   return getDataSet(e.value);
// };
select.addEventListener("change", (e) => {
  getDataSet(e.value);
  //   getDataSet(e.value);
});

const getBestScore = () => {
  let maxRoomsCleans = 0;
  let maxPowerUps = 0;
  let maxEnergy = 0;
  data.map((s, index) => {
    if (s.cleanRooms > maxRoomsCleans) {
      maxRoomsCleans = s.cleanRooms;
    }

    maxPowerUps = s.powerUps > maxPowerUps ? s.powerUps : maxPowerUps;
    maxEnergy = s.energies > maxEnergy ? s.energies : maxEnergy;
  });
  const roomElement = document.getElementById("roomsClean");
  roomElement.innerHTML = maxRoomsCleans;
  const powerElement = document.getElementById("powerUps");
  powerElement.innerHTML = maxPowerUps;
  const energyElement = document.getElementById("energy");
  energyElement.innerHTML = maxEnergy;
};
getBestScore();
