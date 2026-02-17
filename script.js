// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCountElement = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greetingElement = document.getElementById("greeting");
const waterList = document.getElementById("waterList");
const zeroList = document.getElementById("zeroList");
const powerList = document.getElementById("powerList");
// Track attendees
let count = 0;
const maxCount = 50;
// Handle Form Submisson
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;

  count = count + 1;

  console.log(name, teamName);
  console.log(`total check-ins: ${count}`);

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`Progress: ${percentage}`);
  progressBar.style.width = percentage;
  attendeeCountElement.textContent = count;

  // Update team counter
  const teamCounter = document.getElementById(`${team}Count`);

  if (teamCounter) {
    const current = parseInt(teamCounter.textContent, 10);
    console.log(`Previous team count: ${current}`);

    teamCounter.textContent = current + 1;

    const newTotal = current + 1;
    console.log(`New team count: ${newTotal}`);
  }

  // Show welcome message
  const message = `Welcome ${name} from ${teamName}! We're glad you're here 😄`;
  console.log(message);

  greetingElement.textContent = message;
  greetingElement.classList.add("success-message");
  greetingElement.style.display = "block";

  // Add attendee under the selected team
  const listItem = document.createElement("li");
  listItem.classList.add("team-list-item");
  listItem.textContent = name;

  if (team === "water") {
    waterList.appendChild(listItem);
  }

  if (team === "zero") {
    zeroList.appendChild(listItem);
  }

  if (team === "power") {
    powerList.appendChild(listItem);
  }

  if (count >= maxCount) {
    const waterCount =
      parseInt(document.getElementById("waterCount").textContent, 10) || 0;
    const zeroCount =
      parseInt(document.getElementById("zeroCount").textContent, 10) || 0;
    const powerCount =
      parseInt(document.getElementById("powerCount").textContent, 10) || 0;

    let winningTeam = "Team Water Wise";
    let winningCount = waterCount;

    if (zeroCount > winningCount) {
      winningTeam = "Team Net Zero";
      winningCount = zeroCount;
    }

    if (powerCount > winningCount) {
      winningTeam = "Team Renewables";
      winningCount = powerCount;
    }

    greetingElement.textContent = `Goal reached! Celebration time — ${winningTeam} wins! 🎉`;
  }

  form.reset();
});
