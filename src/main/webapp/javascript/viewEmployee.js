let startNum = 1;
let endNum = 10;
let offsetValue;
function FilterOutCards(filterOptions) {
    let OptionsList = filterOptions.querySelectorAll("input[name='FilterName']");
    let array = []

    OptionsList.forEach((Option) => {
        Option.addEventListener("click", () => {
            if (Option.checked) {
                array.push(Option.value);
                console.log(array);
            } else if (!Option.checked) {
                array = array.filter(item => item !== Option.value);
                console.log(array);
            }
        });

    });
}

function fetchFilterOptions(mainContent3, cardContainer, MessageScreen) {

    const filterBtn = mainContent3.querySelector(".filterBtn");
    const filterCateBtns = mainContent3.querySelectorAll(".filterCategoriesBtn");
    const filterOptions = mainContent3.querySelector(".filterOptions");
    const filterScreen = mainContent3.querySelector(".filterScreen");
    let filterBtbBool = false;

    filterBtn.addEventListener("click", (event) => {
        filterScreen.classList.toggle("filterScreenOpen");
        if (!filterBtbBool) {
            filterBtbBool = !filterBtbBool;
        } else if (filterBtbBool) {
            filterBtbBool = !filterBtbBool;
        }
    });

    filterCateBtns.forEach((btn) => {
        btn.addEventListener("click", async () => {
            const byCategories = btn.dataset.page;

            const formData = new FormData();
            formData.append("action", "fetchFilterOptions");
            formData.append("Category", byCategories);

            const response = await fetch("EmployeeServlet", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.status === "error") {
                MessageScreen.style.display = "flex";
                MessageScreen.style.backgroundColor = "rgba(219 22 22 / 50%)";
                MessageScreen.style.color = "rgb(76 7 7)";
                MessageScreen.textContent = "Error!";
                setTimeout(() => {
                    MessageScreen.removeAttribute("style");
                    MessageScreen.textContent = "";
                }, 2000);
                return;
            }

            if (data.deptNameList !== undefined) {

                filterOptions.innerHTML = "";
                data.deptNameList.forEach((name) => {

                    /*filterOptions.innerHTML += `
                    <label>
                        <p>${name}</p>
                        <input type="checkbox" name="deptNameFilter" value="${name}">
                    </label>
                    `;*/
                    filterOptions.innerHTML += `
					<label>
						<p>${name}</p>
						<input type="checkbox" name="FilterName" value="${name}">
					</label>
					`;
                });
                FilterOutCards(filterOptions)
            }

            if (data.jobTitleList !== undefined) {

                filterOptions.innerHTML = "";
                data.jobTitleList.forEach((name) => {

                    /*filterOptions.innerHTML += `
                    <label>
                        <p>${name}</p>
                        <input type="checkbox" name="jobTitleFilter" value="${name}">
                    </label>
                    `;*/
                    filterOptions.innerHTML += `
						<label>
							<p>${name}</p>
						<input type="checkbox" name="FilterName" value="${name}">
					</label>
					`;
                });
                FilterOutCards(filterOptions)
            }

        });
    });

}

function viewEmpIconLoader(mainContent3) {

    const header3 = mainContent3.querySelector(".header3");
    const [searchIcon, filterBtn, nextCardBtn, perviouCardBtn] = header3.querySelectorAll(".searchIcon, .filterBtn, .nextCardBtn, .perviouCardBtn");
    const filterIcons = header3.querySelectorAll(".filterCateIcon");

    filterIcons[0].innerHTML = `
        <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 7H7M6 10H7M11 10H12M11 13H12M6 13H7M11 7H12M7 21V18C7 16.8954 7.89543 16 9 16C10.1046 16 11 16.8954 11 18V21H7ZM7 21H3V4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H13.4C13.9601 3 14.2401 3 14.454 3.10899C14.6422 3.20487 14.7951 3.35785 14.891 3.54601C15 3.75992 15 4.03995 15 4.6V9M19.7 13.5C19.7 14.3284 19.0284 15 18.2 15C17.3716 15 16.7 14.3284 16.7 13.5C16.7 12.6716 17.3716 12 18.2 12C19.0284 12 19.7 12.6716 19.7 13.5ZM21.5 21V20.5C21.5 19.1193 20.3807 18 19 18H17.5C16.1193 18 15 19.1193 15 20.5V21H21.5Z" stroke="var(--text-color3)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" class="linehoverWhite2"/>
        </svg>
    `;

    filterIcons[1].innerHTML = `
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M7 12V14M17 12V14M8 7H7.8C6.11984 7 5.27976 7 4.63803 7.32698C4.07354 7.6146 3.6146 8.07354 3.32698 8.63803C3 9.27976 3 10.1198 3 11.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V11.8C21 10.1198 21 9.27976 20.673 8.63803C20.3854 8.07354 19.9265 7.6146 19.362 7.32698C18.7202 7 17.8802 7 16.2 7H16M8 7V6C8 5.06812 8 4.60218 8.15224 4.23463C8.35523 3.74458 8.74458 3.35523 9.23463 3.15224C9.60218 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6448 3.74458 15.8478 4.23463C16 4.60218 16 5.06812 16 6V7M8 7H16" stroke="var(--text-color3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="linehoverWhite2" />
        </svg>
    `;

    searchIcon.innerHTML = `
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="var(--text-color1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;

    filterBtn.innerHTML = `
        <svg width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="filterIcon">
            <path d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z" stroke="var(--text-color1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `;

    perviouCardBtn.innerHTML = `
		<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	    		<path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="var(--text-color3)" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	`;

    nextCardBtn.innerHTML = `
		<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		    <path d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008" stroke="var(--text-color3)" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	`;

}

function searchEmployeeData(mainContent3, cardContainer) {

    const header3 = mainContent3.querySelector(".header3");
    const searchInput = header3.querySelector(".searchInput");

    searchInput.addEventListener("input", function() {

        let name = searchInput.value.toLowerCase();
        const cards = cardContainer.querySelectorAll(".card");

        cards.forEach((card) => {

            const Data = card.querySelectorAll(".empData");
            let array = [];

            Data.forEach(d => {
                array.push(d.textContent.toLowerCase() !== null ? d.textContent.toLowerCase() : null);
            });

            if (array[0].includes(name) ||
                array[1].includes(name) ||
                array[2].includes(name) ||
                array[3].includes(name) ||
                array[4].includes(name)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });

}

async function fetchDataByEID(btn) {

    const formData = new FormData();
    formData.append("action", "getEmployeeDataByID");
    formData.append("EID", btn.id);

    const response = await fetch("EmployeeServlet", {
        method: "POST",
        body: formData
    });

    const EmpDataForEdit = await response.json();

    const mainContent3 = document.querySelector(".mainContent");
    const inputContainer = mainContent3.querySelector(".inputContainer");
    const btns = mainContent3.querySelectorAll(".btnSection button");
    const [empID, empFirstName, empLastName, empGender, empDOB, empSalary, empEmail, empPhone, empAddress, empCity, empState, empCountry, empPincode, empDeptName, empJobTitle, empType, empJoinDate, empStatus] = mainContent3.querySelectorAll(".inputField");
    const placeholders = mainContent3.querySelectorAll(".placeholder");
    const empImgFrame = mainContent3.querySelector(".empImgFrame");
    const [empImg, uploadSvg] = empImgFrame.querySelectorAll(".empImg, .uploadSvg");
    const options = mainContent3.querySelectorAll('input[name="gender"], input[name="emptype"], input[name="empStatus"]');

    inputContainer.dataset.page = "editModeON";

    empID.value = EmpDataForEdit.empID;
    empFirstName.value = EmpDataForEdit.empFirstName;
    empLastName.value = EmpDataForEdit.empLastName;

    empGender.value = EmpDataForEdit.empGender;
    empDOB.value = EmpDataForEdit.empDOB;
    empSalary.value = EmpDataForEdit.empSalary;

    empImgFrame.style.borderWidth = "2px";
    uploadSvg.style.display = "none";
    empImg.style.display = "block";
    empImg.src = EmpDataForEdit.empPhoto;

    empEmail.value = EmpDataForEdit.empEmail;
    empPhone.value = EmpDataForEdit.empPhone;
    empAddress.value = EmpDataForEdit.empAddress;
    empCity.value = EmpDataForEdit.empCity;
    empState.value = EmpDataForEdit.empState;
    empCountry.value = EmpDataForEdit.empCountry;
    empPincode.value = EmpDataForEdit.empPincode;

    empDeptName.value = EmpDataForEdit.empDeptName;
    empJobTitle.value = EmpDataForEdit.empJobTitle;
    empType.value = EmpDataForEdit.empType;
    empJoinDate.value = EmpDataForEdit.empJoinDate;
    empStatus.value = EmpDataForEdit.empStatus;

    [empID, empFirstName, empLastName, empGender, empDOB, empSalary, empEmail, empPhone, empAddress, empCity, empState, empCountry, empPincode, empDeptName, empJobTitle, empType, empJoinDate, empStatus].forEach((ele) => {
        ele.style.color = "var(--text-color3)";
    });

    placeholders.forEach((ele) => {
        if (!ele.hasAttribute("style")) {
            ele.style.color = "var(--text-color3)";
            ele.style.height = "0.5rem";
            ele.style.lineHeight = "0.5rem";
            ele.style.transform = "translate(-0.5rem, -0.2rem) scale(0.85)";
            ele.style.zIndex = "2";
            ele.style.padding = "0 0.5rem";
            ele.style.fontSize = "0.9em";
        }
    });

    options.forEach((op) => {
        if (op.value == EmpDataForEdit.empGender || op.value == EmpDataForEdit.empType || op.value == EmpDataForEdit.empStatus) {
            op.checked = true;
        }
    });

    btns.forEach(b => {
        if (b.classList.contains("saveBtn")) {
            b.setAttribute("hidden", true);
        } else if (!b.classList.contains("saveBtn")) {
            b.removeAttribute("hidden");
        }
    });
}

async function fetchNewCardsdData(mainContent3, cardContainer, MessageScreen) {

    const header3 = mainContent3.querySelector(".header3");
	const pageButtonContainer = header3.querySelector(".pageButtonContainer");
    let [startCardNum, endCardNum] = pageButtonContainer.querySelectorAll("#startCardNum, #endCardNum");
    const [perviouCardBtn, nextCardBtn] = pageButtonContainer.querySelectorAll(".perviouCardBtn, .nextCardBtn");
	
	const formData = new FormData();
	formData.append("action", "TotalCountOFEID");

	const response = await fetch("EmployeeServlet", {
        method: "POST",
        body: formData
	});

	const data = await response.json();

	if (data.totalCount > 10) {
		pageButtonContainer.style.display = "flex";
		
		console.log(data.totalCount + " > "+ startNum);
		if (data.totalCount > startNum && !nextCardBtn.hasAttribute("style")) {
			perviouCardBtn.style.display = "none";
		}
		
		perviouCardBtn.onclick = () => {
			if (startNum > 1 && endNum > 10) {
				startNum = startNum - 10;
			    endNum = endNum - 10;
		        startCardNum.textContent = startNum;
	            endCardNum.textContent = endNum;
	            fetchData(mainContent3, cardContainer, MessageScreen, false, true);
				if (nextCardBtn.hasAttribute("style")) {
					nextCardBtn.removeAttribute("style"); 
				}
			}
		};

		nextCardBtn.onclick = () => {
	        startNum = startNum + 10;
	        endNum = endNum + 10;
	        startCardNum.textContent = startNum;
	        endCardNum.textContent = endNum;
	        fetchData(mainContent3, cardContainer, MessageScreen, true, false);
			if (data.totalCount <= endNum) {
				nextCardBtn.style.display = "none";
			}
			if (perviouCardBtn.hasAttribute("style")) {
				perviouCardBtn.removeAttribute("style"); 
			}
		};	
	}
}

async function fetchData(mainContent3, cardContainer, MessageScreen, perviou, next) {

    if (perviou === false && next === true) {
		offsetValue = startNum;
		offsetValue = offsetValue - 1;
        // console.log("1. "+ offsetValue);
    } else if (perviou === true && next === false) {
		console.log(endNum);
		offsetValue = endNum;
		offsetValue = offsetValue - 10;
        // console.log("2. "+offsetValue);
    }

    const formData = new FormData();
    formData.append("action", "viewAllEmployees");
    formData.append("offsetValue", offsetValue);

    const response = await fetch("EmployeeServlet", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (data.status === "error") {
        MessageScreen.style.display = "flex";
        MessageScreen.style.backgroundColor = "rgba(219 22 22 / 50%)";
        MessageScreen.style.color = "rgb(76 7 7)";
        MessageScreen.textContent = "Error!";
        setTimeout(() => {
            MessageScreen.removeAttribute("style");
            MessageScreen.textContent = "";
        }, 2000);
        return;
    }

    cardContainer.innerHTML = "";
    data.forEach((emp) => {
        // console.log(emp);
        const fullName = emp.empFirstName + " " + emp.empLastName;
        // get eid, empid, fullname, empPhoto, email, department, jobRole
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="cardDetails">
                <div class="shortInfo">
                    <p class="title">Id</p>
                    <p class="empData">${emp.empID}</p>
					<p class="title">Name<p>
					<p class="empData">${fullName}</p>   
					<p class="title">Email</p>
					<p class="empData">${emp.empEmail}</p>                   
					<p class="title">Department</p>
					<p class="empData">${emp.empDeptName}</p>
                    <p class="title">Job Role</p>
                    <p class="empData">${emp.empJobTitle}</p>
                </div>
                <div class="viewBtn" data-page="add-employees" id=${emp.eid}>View</div>
            </div>
            <div class="photoFrame">
                <img src="${emp.empPhoto}">
            </div>`;
        cardContainer.appendChild(card);
    });

    const images = cardContainer.querySelectorAll(".photoFrame img");
    const cards = cardContainer.querySelectorAll(".card");

    const colorThief = new ColorThief();
    if (colorThief) {
        images.forEach((img, index) => {
            img.addEventListener("load", () => {
                let color = colorThief.getColor(img);
                let brightness = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
                const currentInfo = cards[index].querySelector(".shortInfo");
                const currentInputs = cards[index].querySelectorAll(".shortInfo input");
                const mobile425 = window.matchMedia("(max-width: 425px)");
                const photoFrame = cards[index].querySelector(".photoFrame");
                if (brightness > 128) {
                    if (mobile425.matches) {
                        photoFrame.style.border = "1px solid black";
                    }
                    currentInfo.style.color = "black";
                    currentInputs.forEach(input => {
                        input.style.color = "black";
                    });
                } else {
                    if (mobile425.matches) {
                        photoFrame.style.border = "1px solid white";
                    }
                    currentInfo.style.color = "white";
                    currentInputs.forEach(input => {
                        input.style.color = "white";
                    });
                }
                cards[index].style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            });
        });

        cards.forEach((card) => {
            const btn = card.querySelector(".viewBtn");
            btn.onclick = async () => {
                await loadPage(btn.getAttribute("data-page"));
                await fetchDataByEID(btn);
            };
        });

        searchEmployeeData(mainContent3, cardContainer);
        fetchNewCardsdData(mainContent3, cardContainer, MessageScreen);

    } else {
        const cards = cardContainer.querySelectorAll(".card");
        cards.forEach((card) => {
            card.style.backgroundColor = `var(--color-7)`;
            const currentInfo = card.querySelector(".shortInfo");
            const currentInputs = card.querySelectorAll(".shortInfo input");
            currentInfo.style.color = `var(--text-color3)`;
            currentInputs.forEach(ip => {
                ip.style.color = `var(--text-color3)`;
            });
        });
    }
}

function loadViewEmployeeScript() {
    try {
        const mainContent3 = document.querySelector(".mainContent");
        const MessageScreen = mainContent3.querySelector(".MessageScreen");
        let cardContainer = mainContent3.querySelector(".cardContainer");
		const header3 = mainContent3.querySelector(".header3");
		let [startCardNum, endCardNum] = header3.querySelectorAll("#startCardNum, #endCardNum");
		startCardNum.textContent = startNum;
		endCardNum.textContent = endNum;
        viewEmpIconLoader(mainContent3);
        fetchData(mainContent3, cardContainer, MessageScreen, false, true);
        fetchFilterOptions(mainContent3, cardContainer, MessageScreen);
    } catch (error) {
        console.error("Error loading view employee script:", error);
    }
}