function createGoal(event) {
    event.preventDefault();
  
    const name = document.getElementById("goal-name").value;
    const category = document.getElementById("category").value;
    const deadline = new Date(document.getElementById("deadline").value); // Convert to Date object
    const wager = document.getElementById("wager").value;
  
    if (!name || isNaN(deadline.getTime())) {
      alert("Please enter a valid goal name and deadline.");
      return;
    }
  
    const newGoal = {
      name,
      category,
      deadline: deadline.toISOString(), // Store in ISO format for consistency
      wager,
      completed: false,
    };
  
    const goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.push(newGoal);
    localStorage.setItem("goals", JSON.stringify(goals));
  
    // navigateTo("desktopCalendar.html");
    window.location.href = "desktopHome.html";
  }
  
function goBack() {
  window.location.href = "desktopHome.html"; // Redirect to the home page
}
function navigateTo(page) {
  window.location.href = page;
}
window.onload = loadCalendar;