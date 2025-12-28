const toggleBtn = document.getElementById("toggleBtn");
const contentRow = document.getElementById("contentRow");

toggleBtn.addEventListener("click", () => {
  contentRow.classList.toggle("expanded");
  toggleBtn.classList.toggle("rotated");
});