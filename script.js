// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ul>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ul>
<img src="${}">
*/

window.addEventListener("load", function () {

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         let i = Math.floor(Math.random() * json.length);
         let missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
<ol>
   <li>Name: ${json[i].name}</li>
   <li>Diameter: ${json[i].diameter}</li>
   <li>Star: ${json[i].star}</li>
   <li>Distance from Earth: ${json[i].distance}</li>
   <li>Number of Moons: ${json[i].moons}</li>
</ol>
<img src="${json[i].image}" height=250></img>`;
      });

      let form = document.querySelector("form");
      form.addEventListener("submit", function (event) {

         event.preventDefault();

         let pilotInput = document.querySelector("input[name=pilotName]");
         let copilotInput = document.querySelector("input[name=copilotName]");
         let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
         let cargoMassInput = document.querySelector("input[name=cargoMass]");
         if (pilotInput.value === "" || copilotInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
            alert("all fields are required!"); 
         } else if (!pilotInput.value.match(/^[A-Za-z ]+$/) || !copilotInput.value.match(/^[A-Za-z ]+$/) || isNaN(Number(fuelLevelInput.value)) || isNaN(Number(cargoMassInput.value))) {
            alert("Enter valid data type."); 
         }
         let itemStatus = document.getElementById("itemStatus");  
         itemStatus.style.visibility = "visible";

         let pilotStatus = document.getElementById("pilotStatus");
         pilotStatus.innerHTML = `Pilot ${pilotInput.value} is ready for launch`;

         let copilotStatus = document.getElementById("copilotStatus");
         copilotStatus.innerHTML = `Co-pilot ${copilotInput.value} is ready for launch`;

         let fuelStatus = document.getElementById("fuelStatus");
         let fuelLevel = Number(fuelLevelInput.value);
         let launchStatus = document.getElementById("launchStatus");
         if (fuelLevel < 10000) {
            fuelStatus.innerHTML = `fuel level too low for launch`;
         } else {  
            fuelStatus.innerHTML = `fuel level check passed`;
            
         }

         let cargoStatus = document.getElementById("cargoStatus");
         let cargoMass = Number(cargoMassInput.value);
         if (cargoMass > 10000) {
            cargoStatus.innerHTML = `Cargo mass is too high for launch`;
         } else { 
            cargoStatus.innerHTML = `Cargo mass check passed`;
           
         }

         if (fuelLevel >= 10000 && cargoMass <= 10000) {
            launchStatus.innerHTML = `Shuttle is Ready to Launch`;
            launchStatus.style.color = "green";
         } else {
            launchStatus.innerHTML = `Shuttle not ready to launch`;
            launchStatus.style.color = "red";
         }

      });
   }); 
});