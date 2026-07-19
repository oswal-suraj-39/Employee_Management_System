// console.log("Settings script loaded");
function loadSettingsScript() {
    localStorage.setItem("isDark", false);
    let isDark = localStorage.getItem("isDark") === "true";
    const mainContent2 = document.querySelector(".mainContent");
    mainContent2.addEventListener("click", (event) => {
        const track = event.target.closest(".track");
        if (!track) {
            return;
        }
        document.body.classList.toggle("dark");
        if (isDark) {
            isDark = !isDark;
        } else {
            isDark = !isDark;
        }
    });
}
