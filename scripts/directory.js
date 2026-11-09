const membersContainer = document.getElementById("members-container");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

async function getMembers() {
  const response = await fetch("data/members.json");
  const members = await response.json();
  displayMembers(members);
}

function displayMembers(members) {
  membersContainer.innerHTML = "";
  members.forEach(member => {
    const card = document.createElement("div");
    const levelClass = member.membership === 3 ? "gold" : member.membership === 2 ? "silver" : "";
    card.className = `member-card ${levelClass}`;
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <div>
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
        <p>Membership: ${member.membership === 3 ? "Gold" : member.membership === 2 ? "Silver" : "Member"}</p>
        <p>${member.description}</p>
      </div>
    `;
    membersContainer.appendChild(card);
  });
}

gridBtn.addEventListener("click", () => {
  membersContainer.classList.remove("list");
  membersContainer.classList.add("grid");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.remove("grid");
  membersContainer.classList.add("list");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

getMembers();