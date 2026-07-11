// console.log("Router script loaded");
const mainContent = document.querySelector(".mainContent");
const pageTitle = document.querySelector(".pageTitle");
async function loadPage(page) {
    // console.log("Loading page: " + page);
    if (page === "dashboard") {
        page = "dashboard";
        pageTitle.innerText = "Dashboard";
        mainContent.dataset.page = "dashboard";
    } else if (page === "view-employees") {
        page = "viewEmployee";
        pageTitle.innerText = "View Employee Details";
        mainContent.dataset.page = "viewEmployee";
    } else if (page === "add-employees") {
        page = "addEmployee";
        pageTitle.innerText = "Add Employee Details";
        mainContent.dataset.page = "addEmployee";
    } else if (page === "settings") {
        page = "settings";
        pageTitle.innerText = "Settings"
        mainContent.dataset.page = "settings";
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

	if (page === "viewEmployee") {
	    loadViewEmployeeScript();
	} else if (page === "addEmployee") {
	    loadAddEmployeeScript();
	}
    
}

loadPage("dashboard");