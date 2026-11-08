// console.log("Main script loaded");
const sidePanel = document.querySelector(".sidePanel");
const tabs = sidePanel.querySelectorAll(".btn");
const LineColors = sidePanel.querySelectorAll(".LineColor");
const LineColors2 = sidePanel.querySelectorAll(".LineColor2");

async function counterPanelDataLoader(mainContent5) {
	
	const counterPanel = mainContent5.querySelector(".counterPanel");
	const cNumber = counterPanel.querySelectorAll(".cNumber");
	
	const formData = new FormData();
	formData.append("action", "counterPanelData");
	
	const response = await fetch("EmployeeServlet", {
		method: "POST",
	    body: formData
	});
	
	const data = await response.json();
	
	cNumber[0].textContent = data.TotalCountOfEID != -1 ? data.TotalCountOfEID : 0;
	
	cNumber[1].textContent = data.total_active_employee != null ? data.total_active_employee : 0;
	
	cNumber[2].textContent = data.total_inactive_employee != null ? data.total_inactive_employee : 0;
	
	cNumber[3].textContent = data.TotalCountOfDepartment != -1 ? data.TotalCountOfDepartment : 0;
	
}

function svgLoaderForDashboard(mainContent5) {

    const counterIcon = mainContent5.querySelectorAll(".counterIcon");

    counterIcon[0].innerHTML = `
        <svg class="LineColor2" stroke-width="1.3" fill="#ffffff" height="56px" width="56px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve">
            <path d="M115,147.75c20.389,0,38.531-9.78,50-24.889c11.469,15.109,29.611,24.889,50,24.889 c34.601,0,62.75-28.149,62.75-62.75S249.601,22.25,215,22.25c-20.389,0-38.531,9.78-50,24.889 C153.531,32.03,135.389,22.25,115,22.25c-34.601,0-62.75,28.149-62.75,62.75S80.399,147.75,115,147.75z M215,52.25 c18.059,0,32.75,14.691,32.75,32.75s-14.691,32.75-32.75,32.75S182.25,103.059,182.25,85S196.941,52.25,215,52.25z M115,52.25 c18.059,0,32.75,14.691,32.75,32.75s-14.691,32.75-32.75,32.75S82.25,103.059,82.25,85S96.941,52.25,115,52.25z" />
            <path d="M215,177.75c-17.373,0-34.498,3.942-50.022,11.44c-15.122-7.327-32.078-11.44-49.978-11.44 c-63.411,0-115,51.589-115,115c0,8.284,6.716,15,15,15h200h100c8.284,0,15-6.716,15-15C330,229.339,278.411,177.75,215,177.75z M31.325,277.75c7.106-39.739,41.923-70,83.675-70s76.569,30.261,83.675,70H31.325z M229.021,277.75 c-3.45-26.373-15.873-49.96-34.092-67.597c6.539-1.583,13.277-2.403,20.07-2.403c41.751,0,76.569,30.261,83.675,70H229.021z" />
        </svg>
    `;

    counterIcon[1].innerHTML = `
        <svg width="56px" height="56px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="LineColor">
            <g stroke-width="1.3">
                <path d="M14.4399 19.05L15.9599 20.57L18.9999 17.53" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.44997 10.79 7.55997 8.84 7.55997 6.44C7.54997 3.99 9.53997 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.43 8.84 14.53 10.79 12.16 10.87Z" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.99 21.8101C10.17 21.8101 8.36004 21.3501 6.98004 20.4301C4.56004 18.8101 4.56004 16.1701 6.98004 14.5601C9.73004 12.7201 14.24 12.7201 16.99 14.5601" stroke-linecap="round" stroke-linejoin="round" />
            </g>
        </svg>
    `;

    counterIcon[2].innerHTML = `
        <svg width="56px" height="56px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="LineColor">
            <path d="M16 15.2V16.8875L16.9 17.9M9 11H4M20 9V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H9M15 3V7M9 3V7M20.5 17C20.5 19.4853 18.4853 21.5 16 21.5C13.5147 21.5 11.5 19.4853 11.5 17C11.5 14.5147 13.5147 12.5 16 12.5C18.4853 12.5 20.5 14.5147 20.5 17Z" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `;
	
	counterIcon[3].innerHTML = `
		<svg width="58px" height="58px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="LineColor">
			<path d="M6 7H7M6 10H7M11 10H12M11 13H12M6 13H7M11 7H12M7 21V18C7 16.8954 7.89543 16 9 16C10.1046 16 11 16.8954 11 18V21H7ZM7 21H3V4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H13.4C13.9601 3 14.2401 3 14.454 3.10899C14.6422 3.20487 14.7951 3.35785 14.891 3.54601C15 3.75992 15 4.03995 15 4.6V9M19.7 13.5C19.7 14.3284 19.0284 15 18.2 15C17.3716 15 16.7 14.3284 16.7 13.5C16.7 12.6716 17.3716 12 18.2 12C19.0284 12 19.7 12.6716 19.7 13.5ZM21.5 21V20.5C21.5 19.1193 20.3807 18 19 18H17.5C16.1193 18 15 19.1193 15 20.5V21H21.5Z" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	`;
}

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

function updateClock(mainContent5) {
	if (!mainContent5) return;
	const date = mainContent5.querySelector("#date");
	const time = mainContent5.querySelector("#time");
	if (!date || !time) return;
	
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

    date.textContent = `${day} / ${month} / ${year}`;
    time.textContent = `${hours} : ${minutes} ${ampm}`;
}

async function chartLoader(mainContent5) {
	console.log("chart function loaded");
	
	const chartContainer = mainContent5.querySelector(".chart-container");
	const [pieChart1, pieChart2, barChart] = chartContainer.querySelectorAll("#pie-chart-1, #pie-chart-2, #bar-chart");
	
	const textColor = getComputedStyle(document.body).getPropertyValue("--text-color3").trim();
	const isSmallMobile = window.matchMedia("(max-width: 375px)").matches;
	const chartAxis = isSmallMobile ? "x" : "y";

	const formData = new FormData();
	formData.append("action", "FetchChartsData");
		
	const response = await fetch("EmployeeServlet", {
		method: "POST",
	    body: formData
	});
		
	const data = await response.json();

	const PieChart1 = new Chart(pieChart1, {
	    type: "pie",
	    data: {
			labels: ["Active", "Inactive"],
			datasets: [{
		        label: "Employee Status",
		        data: [data.employeeStatusData.total_active_employee, data.employeeStatusData.total_inactive_employee],
		        backgroundColor: ["green", "red"],
		    	}]
	    },
		options: {
			plugins: {
				title: {
					display: true,
					text: "Employee Status",
					color: textColor
				},
				legend: {
					labels: {
						color: textColor
			        }
			    }
			}
		}
	});
	
	const PieChart2 = new Chart(pieChart2, {
		type: "pie",
		data: {
			labels: ["Male", "Female", "Other"],
			datasets: [{
		    		label: "genders",
		    		data: [data.gendersData.male, data.gendersData.female, data.gendersData.other],
	        		backgroundColor: ["#36A2EB", "#FF6384", "#FF9F40"]
	    		}]
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: "Gander",
					color: textColor
				},
				legend: {
					labels: {
				        color: textColor
			        }
			    }
			}
		}
	});
	
	const BarChart = new Chart(barChart, {
		type: "bar",
		data: {
			labels: data.departmentWiseEmployeeCount.deptNameList,
			datasets: [{
				label: "Department-wise Employee",
				data: data.departmentWiseEmployeeCount.countList,
				backgroundColor: '#16db65',
				borderRadius: 50
			}]
		},
		options: {
			indexAxis: chartAxis,
			scales: {
				x: {
			        ticks: {
		                color: textColor
		            }
		        },
			    y: {
			        ticks: {
	                		color: textColor,
						autoSkip: false
			     	}
				}
			},
			plugins: {
				legend: {
					labels: {
						color: textColor
			        }
				}
			}
		}
	});

}

async function loadDashboard() {
    try {
        const mainContent5 = document.querySelector(".mainContent");
        updateClock(mainContent5);
        setInterval(updateClock, 60000);
        svgLoaderForDashboard(mainContent5);
		await counterPanelDataLoader(mainContent5);
		await chartLoader(mainContent5);
    } catch (error) {
        console.error("Error loading dashboard:", error);

    }
}

sidePanelNav();