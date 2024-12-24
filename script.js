const newForm = document.querySelector("#new-form");
const toggleForm = document.querySelector("#toggle-form");

toggleForm.addEventListener("click", () => {
  newForm.classList.toggle("new-form-toggler");
  toggleForm.classList.toggle("rotate-45");
});

window.addEventListener("load", () => {
  let activities = localStorage.getItem("activities");
  activities = activities ? JSON.parse(activities) : [];

  document.querySelector("#all").innerHTML = activities.length;

  if (activities.length > 0) {
    document.querySelector("#incomplete").innerHTML = activities.filter(
      a => !a.status
    ).length;
    document.querySelector("#complete").innerHTML = activities.filter(
      a => a.status
    ).length;

    for (let activity of activities) {
      document.querySelector("#cards").innerHTML += `
        <div class="card">
          <h4 class="card-label-w-icon">
            ${activity.activity}
            <i class="fa-solid fa-trash text-red-600"></i>
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
    }
  }
});

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

    let localData = localStorage.getItem("activities");
    localData = localData ? JSON.parse(localData) : [];

    localData.push(newActivity);
    localStorage.setItem("activities", JSON.stringify(localData));

    activityInput.value = "";
    descriptionInput.value = "";
    dueDateInput.value = "";
  } catch (e) {
    console.log(e);
  }
});
