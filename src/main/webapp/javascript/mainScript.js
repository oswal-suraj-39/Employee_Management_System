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

sidePanelNav();