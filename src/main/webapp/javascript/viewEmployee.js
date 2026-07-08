async function updateEmplyeeData(mainContent3) {
    let columns = [];
    let newValues = [];
    const updateBtn = mainContent3.querySelector(".updateBtn");

    mainContent3.addEventListener("dblclick", (event) => {
        const inputOutline = event.target.closest(".inputOutline");
        if (!inputOutline) return;
        const inputField = inputOutline.querySelector(".inputField");
        inputField.removeAttribute("readonly");
        columns.push(inputField.name);
        newValues.puch(inputField);
    });

    updateBtn.onclick = function() {
        console.log(columns);
        for (let i = 0; i < newValues.length; i++) {
			newValues[i] = newValues[i].value;
		}
		console.log(newValues);
    };
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
    const btns = mainContent3.querySelectorAll(".btnSection button");
    const [empID, empFirstName, empLastName, empGender, empDOB, empSalary, empEmail, empPhone, empAddress, empCity, empState, empCountry, empPincode, empDeptName, empJobTitle, empType, empJoinDate, empStatus] = mainContent3.querySelectorAll(".inputField");
    const placeholders = mainContent3.querySelectorAll(".placeholder");
    const empImgFrame = mainContent3.querySelector(".empImgFrame");
    const [empImg, uploadSvg] = empImgFrame.querySelectorAll(".empImg, .uploadSvg");
    const options = mainContent3.querySelectorAll('input[name="gender"], input[name="emptype"], input[name="empStatus"]');

    empID.value = EmpDataForEdit.empID;
    empID.setAttribute("readonly", true);
    empFirstName.value = EmpDataForEdit.empFirstName;
    empFirstName.setAttribute("readonly", true);
    empLastName.value = EmpDataForEdit.empLastName;
    empLastName.setAttribute("readonly", true);

    empGender.value = EmpDataForEdit.empGender;
    empGender.dataset.page = "SelectionOFF";
    empDOB.value = EmpDataForEdit.empDOB;
    empDOB.setAttribute("readonly", true);
    empSalary.value = EmpDataForEdit.empSalary;
    empSalary.setAttribute("readonly", true);

    empImgFrame.style.borderWidth = "2px";
    uploadSvg.style.display = "none";
    empImg.style.display = "block";
    empImg.src = EmpDataForEdit.empPhoto;

    empEmail.value = EmpDataForEdit.empEmail;
    empEmail.setAttribute("readonly", true);
    empPhone.value = EmpDataForEdit.empPhone;
    empPhone.setAttribute("readonly", true);
    empAddress.value = EmpDataForEdit.empAddress;
    empAddress.setAttribute("readonly", true);
    empCity.value = EmpDataForEdit.empCity;
    empCity.setAttribute("readonly", true);
    empState.value = EmpDataForEdit.empState;
    empState.setAttribute("readonly", true);
    empCountry.value = EmpDataForEdit.empCountry;
    empCountry.setAttribute("readonly", true);
    empPincode.value = EmpDataForEdit.empPincode;
    empPincode.setAttribute("readonly", true);

    empDeptName.value = EmpDataForEdit.empDeptName;
    empDeptName.setAttribute("readonly", true);
    empJobTitle.value = EmpDataForEdit.empJobTitle;
    empJobTitle.setAttribute("readonly", true);
    empType.value = EmpDataForEdit.empType;
    empType.dataset.page = "SelectionOFF";
    empJoinDate.value = EmpDataForEdit.empJoinDate;
    empJoinDate.setAttribute("readonly", true);
    empStatus.value = EmpDataForEdit.empStatus;
    empStatus.dataset.page = "SelectionOFF";

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

async function fetchData(mainContent3, cardContainer, MessageScreen) {
    const formData = new FormData();
    formData.append("action", "viewAllEmployees");

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

    data.forEach((emp) => {
        // console.log(emp);
        const fullName = emp.empFirstName + " " + emp.empLastName;
        // get eid, empid, fullname, empPhoto, email, department, jobRole
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <form>
                <div class="shortInfo">
                    <label>Id<br>
                        <input type="text" name="empID" value="${emp.empID}" readonly>
                    </label>
                    <label>Name<br>
                        <input type="text" name="ename" value="${fullName}" readonly>
                    </label>
                    <label>Email<br>
                        <input type="email" name="email" value="${emp.empEmail}" readonly>
                    </label>
                    <label>Department<br>
                        <input type="text" name="department" value="${emp.empDeptName}" readonly>
                    </label>
                    <label>Job Role<br>
                        <input type="text" name="job_role" value="${emp.empJobTitle}" readonly>
                    </label>
                </div>
                <div class="viewBtn" data-page="add-employees" id=${emp.eid}>View</div>
            </form>
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
                if (brightness > 128) {
                    currentInfo.style.color = "black";
                    currentInputs.forEach(input => {
                        input.style.color = "black";
                    });
                } else {
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
            btn.onclick = () => {
                fetchDataByEID(btn);
                loadPage(btn.getAttribute("data-page"));
                updateEmplyeeData(mainContent3);
            }
        });

    } else {
        console.log(cardContainer);
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
        fetchData(mainContent3, cardContainer, MessageScreen);
    } catch (error) {
        console.log(error);
    }
}