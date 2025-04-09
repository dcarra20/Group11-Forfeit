let currentDate = new Date();

// Load the calendar when the page is loaded
function loadCalendar() {
    const calendarBody = document.getElementById('calendar-body');
    const monthYear = document.getElementById('month-year');
    
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    calendarBody.innerHTML = ''; // Clear the calendar body before repopulating

    monthYear.innerText = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    let dayCounter = 1;
    for (let row = 0; row < 6; row++) {
        let tr = document.createElement('tr');
        for (let col = 0; col < 7; col++) {
            let td = document.createElement('td');

            if (row === 0 && col < firstDay) {
                td.classList.add('prev-month');
                td.innerText = '';
            } else if (dayCounter > lastDate) {
                td.classList.add('next-month');
                td.innerText = '';
            } else {
                td.innerText = dayCounter;
                td.setAttribute('data-day', dayCounter);

                // Highlight the current day
                if (
                    dayCounter === new Date().getDate() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear()
                ) {
                    td.classList.add('highlight');
                }

                // Check if it's a goal day
                if (isGoalDay(dayCounter)) {
                    td.classList.add('goal-day');
                }

                dayCounter++;
            }

            tr.appendChild(td);
        }
        calendarBody.appendChild(tr);
    }
}

// Function to check if a day is a goal day
function isGoalDay(day) {
    const goals = JSON.parse(localStorage.getItem("goals")) || [];
    return goals.some(goal => {
        const goalDate = new Date(goal.deadline); // Convert stored date back
        return (
            goalDate.getDate() === day &&
            goalDate.getMonth() === currentDate.getMonth() &&
            goalDate.getFullYear() === currentDate.getFullYear() &&
            !goal.completed
        );
    });
}

// Load the previous month
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadCalendar();
}

// Load the next month
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadCalendar();
}

// Load the calendar when the window is loaded
window.onload = loadCalendar;
