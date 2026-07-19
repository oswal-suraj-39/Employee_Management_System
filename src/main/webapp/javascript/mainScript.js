// console.log("Main script loaded");
const sidePanel = document.querySelector(".sidePanel");
const tabs = sidePanel.querySelectorAll(".btn");
const LineColors = sidePanel.querySelectorAll(".LineColor");
const LineColors2 = sidePanel.querySelectorAll(".LineColor2");
function sidePanelNav() {
    tabs.forEach(btn => {
        btn.onclick = () => {
            loadPage(btn.getAttribute("data-page"));
            tabs.forEach(btn => {
                btn.classList.remove("active");
            });
            LineColors.forEach(line => {
                if (!line) return;
                line.classList.remove("LineColorGreen");
            });
            LineColors2.forEach(line2 => {
                if (!line2) return;
                line2.classList.remove("LineColorGreen2");
            });
            btn.classList.add("active");
            const lineColor = btn.querySelector(".LineColor");
            const lineColor2 = btn.querySelector(".LineColor2");
            if (lineColor) {
                lineColor.classList.add("LineColorGreen");
            } else if (lineColor2) {
                lineColor2.classList.add("LineColorGreen2");
            }            
        }
    });
    LineColors[0].classList.add("LineColorGreen");
}

function updateClock() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    const minutes = String(now.getMinutes()).padStart(2, "0");
    let hours = now.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    hours = String(hours).padStart(2, "0");

    document.getElementById("date").textContent = `${day} / ${month} / ${year}`;
    document.getElementById("time").textContent = `${hours} : ${minutes} ${ampm}`;
}

function loadDashboard() {
    try {
        const dateElement = document.querySelector(".date");
        const timeElement = document.querySelector(".time");
        updateClock();
        setInterval(updateClock, 60000);
    } catch (error) {
        console.error("Error loading dashboard:", error);

    }
}

sidePanelNav();