// console.log("Router script loaded");
const mainContent = document.querySelector(".mainContent");
const pageTitle = document.querySelector(".pageTitle");
async function loadPage(page) {
    // console.log("Loading page: " + page);
	switch (page) {
		case "dashboard":
			page = "dashboard";
			pageTitle.innerText = "Dashboard";
			mainContent.dataset.page = "dashboard";
			if (mainContent.hasAttribute("style")) {
				mainContent.removeAttribute("style");
			}
			break;
		case "view-employees":
			page = "viewEmployee";
			pageTitle.innerText = "View Employee Details";
			mainContent.dataset.page = "viewEmployee";
			mainContent.style.padding = "1rem 0";
			break;
		case "add-employees":
			page = "addEmployee";
			pageTitle.innerText = "Add Employee Details";
			mainContent.dataset.page = "addEmployee";
			if (mainContent.hasAttribute("style")) {
				mainContent.removeAttribute("style");
			}
			break;
		case "settings":
			page = "settings";
			pageTitle.innerText = "Settings"
			mainContent.dataset.page = "settings";
			if (mainContent.hasAttribute("style")) {
				mainContent.removeAttribute("style");
			}
			break;
		default:
			break;
	}

	// const url = `html/${page}.html`; 
	// console.log("url: "+url);
	// console.log("page: "+page);
	const response = await fetch(`html/${page}.html`);
	const data = await response.text();

	mainContent.innerHTML = data;

	let div = document.createElement("div");
	div.classList.add("MessageScreen");
	mainContent.appendChild(div);

	switch (page) {
		case "dashboard":
			loadDashboard();
			break;
		case "viewEmployee":
			loadViewEmployeeScript();
			break;
		case "addEmployee":
			loadAddEmployeeScript();
			break;
		default:
			break;
	}
    
}

loadPage("dashboard");