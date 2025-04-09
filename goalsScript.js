function navigateTo(page) {
  window.location.href = page;
}

function showTab(tab) {
  const activeTab = document.getElementById("active-goals");
  const pastTab = document.getElementById("past-goals");

  if (tab === "active") {
    activeTab.classList.remove("hidden");
    pastTab.classList.add("hidden");
    document.querySelector(".tab-btn:nth-child(1)").classList.add("active");
    document.querySelector(".tab-btn:nth-child(2)").classList.remove("active");
  } else {
    pastTab.classList.remove("hidden");
    activeTab.classList.add("hidden");
    document.querySelector(".tab-btn:nth-child(1)").classList.remove("active");
    document.querySelector(".tab-btn:nth-child(2)").classList.add("active");
  }
}

function loadGoals() {
  const goals = JSON.parse(localStorage.getItem("goals")) || [];
  const activeTable = document
    .getElementById("active-goals")
    .querySelector("table");
  const pastTable = document
    .getElementById("past-goals")
    .querySelector("table");

  activeTable.innerHTML = `<tr>
        <th>Name</th>
        <th>Date</th>
        <th>Category</th>
        <th>Complete</th>
    </tr>`;
  pastTable.innerHTML = `<tr>
        <th>Name</th>
        <th>Date</th>
        <th>Category</th>
        <th>Complete</th>
    </tr>`;

  goals.forEach((goal, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${goal.name}</td>
            <td>${goal.deadline}</td>
            <td>${goal.category}</td>
            <td class="complete" onclick="markAsComplete(${index})">${
      goal.completed ? "✔️" : ""
    }</td>
        `;
    if (goal.completed) {
      pastTable.appendChild(row);
    } else {
      activeTable.appendChild(row);
    }
  });
}

function markAsComplete(index) {
  const goals = JSON.parse(localStorage.getItem("goals")) || [];
  goals[index].completed = true;
  localStorage.setItem("goals", JSON.stringify(goals));
  loadGoals(); // Reload goals after update
}

window.onload = loadGoals;
