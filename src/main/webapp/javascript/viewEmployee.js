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
    const [empID, empFirstName, empLastName, empGender, empDOB, empSalary, empEmail, empPhone, empAddress, empCity, empState, empCountry, empPincode, empDeptName, empJobTitle, empType, empJoinDate, empStatus] = mainContent3.querySelectorAll(".inputField");
    const placeholders = mainContent3.querySelectorAll(".placeholder");
    const empImgFrame = mainContent3.querySelector(".empImgFrame");
    const empImg = empImgFrame.querySelector(".empImg");
    const uploadSvg = empImgFrame.querySelector(".uploadSvg");
    const options = mainContent3.querySelectorAll('input[name="gender"], input[name="emptype"], input[name="empStatus"]');

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
}

async function fetchData(cardContainer) {
    const formData = new FormData();
    formData.append("action", "viewAllEmployees");

    const response = await fetch("EmployeeServlet", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

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
    cards.forEach((card, index) => {
        card.onclick = () => {
            const btn = card.querySelector(".viewBtn");
            const data = fetchDataByEID(btn);
            loadPage(btn.getAttribute("data-page"));
        }
    });
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
        let cardContainer = mainContent3.querySelector(".cardContainer");
        fetchData(cardContainer);
    } catch (error) {
        console.log(error);
    }
}