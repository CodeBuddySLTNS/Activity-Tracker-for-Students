const newForm = document.querySelector("#new-form");
const toggleForm = document.querySelector("#toggle-form");

// Toggle form
toggleForm.addEventListener("click", () => {
  newForm.classList.toggle("new-form-toggler");
  toggleForm.classList.toggle("rotate-45");
  if (newForm.classList.contains("new-form-toggler")) scrollToTop();
});

// Get the activities from local storage
let activities = localStorage.getItem("activities");
activities = activities ? JSON.parse(activities) : [];

// display the activities
displayActivities();
  
const activityInput = document.querySelector("#activityInput");
const descriptionInput = document.querySelector("#descriptionInput");
const dueDateInput = document.querySelector("#dueDateInput");

newForm.addEventListener("submit", e => {
  e.preventDefault();
  try {
    const newActivity = {
      activity: activityInput.value.trim(),
      description: descriptionInput.value.trim(),
      due: dueDateInput.value.trim(),
      status: false
    };
    
    activities.unshift(newActivity);
    localStorage.setItem("activities", JSON.stringify(activities));
    
    displayActivities();
    activityInput.value = "";
    descriptionInput.value = "";
    dueDateInput.value = "";
  } catch (e) {
    console.log(e);
  }
});

function displayActivities() {
  if (activities.length > 0) {
    document.querySelector("#cards").innerHTML = '';
    document.querySelector("#all").innerHTML = activities.length;
    document.querySelector("#incomplete").innerHTML = activities.filter(
      a => !a.status
    ).length;
    document.querySelector("#complete").innerHTML = activities.filter(
      a => a.status
    ).length;
  
    activities.forEach((activity) => {
      document.querySelector("#cards").innerHTML += `
        <div class="card">
          <h4 class="card-label-w-icon">
            ${activity.activity}
            <i class="fa-solid fa-trash text-red-600" onclick="deleteActivity('${activity.activity}')"></i>
          </h4>
          <pre class="card-description">${activity.description}</pre
          >
          <p class="my-1">Due: ${activity.due}</p>
          <div class="mt-1 grid grid-cols-2 gap-2">
            <button class="button bg-blue-200">
              <i class="fa-solid fa-pen-to-square"></i>
              Edit
            </button>
            ${
              activity.status
                ? `<button class="button bg-green-100 text-green-700">
              <i class="fa-solid fa-check"></i>
              Completed
            </button>`
                : `<button class="button bg-red-100 flex justify-center gap-1.5 items-center">
              <i class="fa-solid fa-xmark"></i>
              Incomplete
            </button>`
            }
          </div>
        </div>
      `;
    });
  }

}

function deleteActivity(activity) {
  if (confirm(`Are you sure you want to delete ${activity.toUpperCase()}?`)) {
    const updatedActivities = activities.filter(a => a.activity !== activity);
    activities = updatedActivities;
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
    displayActivities();
    
  }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
