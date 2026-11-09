const courses = [
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, certificate: "Web and Computer Programming", completed: true },
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, certificate: "Web and Computer Programming", completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, certificate: "Web and Computer Programming", completed: true },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, certificate: "Web and Computer Programming", completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, certificate: "Web and Computer Programming", completed: true },
  { subject: "WDD", number: 231, title: "Web Frontend Development I", credits: 2, certificate: "Web and Computer Programming", completed: false }
];

const courseList = document.getElementById("course-list");
const totalCreditsEl = document.getElementById("total-credits");
const filterButtons = document.querySelectorAll(".filter-btn");

function displayCourses(filter = "all") {
  const filtered = filter === "all" ? courses : courses.filter(c => c.subject === filter);
  courseList.innerHTML = "";
  filtered.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card" + (course.completed ? " completed" : "");
    card.innerHTML = `<h3>${course.subject} ${course.number}</h3><p>${course.title}</p><p>${course.credits} credits</p>`;
    courseList.appendChild(card);
  });
  const total = filtered.reduce((sum, c) => sum + c.credits, 0);
  totalCreditsEl.textContent = `Total Credits: ${total}`;
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    displayCourses(btn.dataset.filter);
  });
});

displayCourses();