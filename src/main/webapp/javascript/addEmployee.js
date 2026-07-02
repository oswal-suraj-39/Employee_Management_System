function previewFile(file, empImgFrame, uploadSvg, empImg) {

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        empImgFrame.style.borderWidth = "2px";
        uploadSvg.style.display = "none";
        empImg.style.display = "block";
        empImg.src = reader.result;
    };

}

function handleFile(e, empImgFrame, uploadSvg, empImg) {

    const file = e.target.files[0];

    if (file) {
        if (file.size > 4 * 1024 * 1024) {
            console.warn("image is 4MB size limit");
            e.target.value = "";
            return;
        }

        previewFile(file, empImgFrame, uploadSvg, empImg);
    }
}

async function saveEmployeeData(mainContent4, MessageScreen) {

    const [empID, empFirstName, empLastName, empGender, empDOB, empSalary, empEmail, empPhone, empAddress, empCity, empState, empCountry, empPincode, empDeptName, empJobTitle, empType, empJoinDate, empStatus] = mainContent4.querySelectorAll(".inputField");
    const imageUpload = mainContent4.querySelector(".imageUpload");
    const empPhoto = imageUpload.files[0];
    const formData = new FormData;

    formData.append("empID", empID.value);
    formData.append("empFirstName", empFirstName.value);
    formData.append("empLastName", empLastName.value);
    formData.append("empGender", empGender.value);
    formData.append("empDOB", empDOB.value);
    formData.append("empSalary", empSalary.value);
    formData.append("empPhoto", empPhoto);

    formData.append("empEmail", empEmail.value);
    formData.append("empPhone", empPhone.value);
    formData.append("empAddress", empAddress.value);
    formData.append("empCity", empCity.value);
    formData.append("empState", empState.value);
    formData.append("empCountry", empCountry.value);
    formData.append("empPincode", empPincode.value);

    formData.append("empDeptName", empDeptName.value);
    formData.append("empJobTitle", empJobTitle.value);
    formData.append("empType", empType.value);
    formData.append("empJoinDate", empJoinDate.value);
    formData.append("empStatus", empStatus.value);

    const response = await fetch("EmployeeServlet", {
        method: "POST",
        body: formData
    });

    const result = await response.json();

    if (result.employeeData === "error" && result.employeeContactData === "error" && result.employeeDepartmentData === "error") {
        console.error("Error saving employee data:", response.statusText);
        return;
    }

    if (result.employeeData === "ok" && result.employeeContactData === "ok" && result.employeeDepartmentData === "ok") {
        MessageScreen.style.display = "flex";
        MessageScreen.textContent = "Save!";
        setTimeout(() => {
            MessageScreen.removeAttribute("style");
            MessageScreen.textContent = "";
        }, 1000);
    }
}

function loadAddEmployeeScript() {
    try {
        const mainContent4 = document.querySelector(".mainContent");
        const btns = document.querySelectorAll(".btnSection button");
        const inputContainer = mainContent4.querySelector(".inputContainer");
        const genderRadios = inputContainer.querySelectorAll('input[name="gender"]');
        const employeeTypeRadios = inputContainer.querySelectorAll('input[name="emptype"]');
        const employeeStatusRadios = inputContainer.querySelectorAll('input[name="empStatus"]');
        const empImgFrame = inputContainer.querySelector(".empImgFrame");
        const MessageScreen = inputContainer.querySelector(".MessageScreen");
        const empImg = empImgFrame.querySelector(".empImg");
        const addEmpBtn = sidePanel.querySelector("button[data-page='add-employees']");
        const lineColor = addEmpBtn.querySelector(".LineColor");
        const lineColor2 = addEmpBtn.querySelector(".LineColor2");

        btns.forEach(b => {

            if (b.classList.contains("saveBtn") && b.hidden === true) {
                b.hidden = false;
            } else {
                b.hidden = true;
            }

            b.onclick = (event) => {
                if (event.target.closest(".saveBtn")) {
                    saveEmployeeData(mainContent4, MessageScreen);
                }
            }

        });

        if (!inputContainer) return;

        inputContainer.addEventListener("click", (event) => {
            const inputOutline = event.target.closest(".inputOutline");

            if (!inputOutline) return;

            const inputField = inputOutline.querySelector(".inputField");
            const placeholder = inputOutline.querySelector(".placeholder");
            const genderInput = inputOutline.querySelector(".genderInput");
            const employeeTypeInput = inputOutline.querySelector(".employeeTypeInput");
            const employeeStatusInput = inputOutline.querySelector(".employeeStatusInput");

            if (!placeholder.hasAttribute("style")) {
                placeholder.style.color = "var(--text-color3)";
                placeholder.style.height = "0.5rem";
                placeholder.style.lineHeight = "0.5rem";
                placeholder.style.transform = "translate(-0.5rem, -0.2rem) scale(0.85)";
                placeholder.style.zIndex = "2";
                placeholder.style.padding = "0 0.5rem";
                placeholder.style.fontSize = "0.9em";
            }

            if (inputField) {
                inputField.style.color = "var(--text-color3)";
            }

            if (inputField.type === "date") {
                inputField.showPicker();
            }

            if (genderInput) {
                const genderSelection = inputOutline.querySelector(".genderSelection");

                genderSelection.classList.toggle("open");

                if (genderSelection.classList.contains("open")) {
                    genderSelection.style.top = "2.5rem";
                    genderSelection.style.opacity = "1";
                    genderSelection.style.zIndex = "3";
                } else {
                    genderSelection.removeAttribute("style");
                }
            } else if (employeeTypeInput) {

                const employeeTypeSelection = inputOutline.querySelector(".employeeTypeSelection");

                employeeTypeSelection.classList.toggle("open");

                if (employeeTypeSelection.classList.contains("open")) {

                    employeeTypeSelection.style.top = "2.5rem";
                    employeeTypeSelection.style.opacity = "1";
                    employeeTypeSelection.style.zIndex = "3";

                } else {

                    employeeTypeSelection.removeAttribute("style");

                }
            }
            if (employeeStatusInput) {

                const employeeStatusSelection = inputOutline.querySelector(".employeeStatusSelection");

                employeeStatusSelection.classList.toggle("open");

                if (employeeStatusSelection.classList.contains("open")) {

                    employeeStatusSelection.style.top = "2.5rem";
                    employeeStatusSelection.style.opacity = "1";
                    employeeStatusSelection.style.zIndex = "3";

                } else {
                    employeeStatusSelection.removeAttribute("style");
                }
            }
        });
        genderRadios.forEach(radio => {
            radio.addEventListener("change", () => {

                const inputOutline = radio.closest(".inputOutline")
                const genderInput = inputOutline.querySelector(".genderInput");
                if (!genderInput) return;
                const genderSelection = inputOutline.querySelector(".genderSelection");

                genderInput.value = radio.value;
                genderSelection.removeAttribute("style");
                genderSelection.classList.remove("open");

            });
        });
        employeeTypeRadios.forEach(radio => {
            radio.addEventListener("change", () => {

                const inputOutline = radio.closest(".inputOutline");
                const employeeTypeInput = inputOutline.querySelector(".employeeTypeInput");

                if (!employeeTypeInput) return;

                const employeeTypeSelection = inputOutline.querySelector(".employeeTypeSelection");

                employeeTypeInput.value = radio.value;
                employeeTypeSelection.removeAttribute("style");
                employeeTypeSelection.classList.remove("open");
            });
        });
        employeeStatusRadios.forEach(radio => {
            radio.addEventListener("change", () => {

                const inputOutline = radio.closest(".inputOutline");
                const employeeStatusInput = inputOutline.querySelector(".employeeStatusInput");

                if (!employeeStatusInput) return;

                const employeeStatusSelection = inputOutline.querySelector(".employeeStatusSelection");

                employeeStatusInput.value = radio.value;
                employeeStatusSelection.removeAttribute("style");
                employeeStatusSelection.classList.remove("open");
            });
        });

        document.addEventListener("click", (event) => {
            const inputOutline = event.target.closest(".inputOutline");

            if (!inputOutline || !inputOutline.querySelector(".genderInput")) {

                document.querySelectorAll(".genderSelection.open").forEach(dropdown => {

                    dropdown.removeAttribute("style");
                    dropdown.classList.remove("open");
                });
            }
            if (!inputOutline || !inputOutline.querySelector(".employeeTypeInput")) {

                document.querySelectorAll(".employeeTypeSelection.open").forEach(dropdown => {

                    dropdown.removeAttribute("style");
                    dropdown.classList.remove("open");
                });
            }
            if (!inputOutline || !inputOutline.querySelector(".employeeStatusInput")) {

                document.querySelectorAll(".employeeStatusSelection.open").forEach(dropdown => {

                    dropdown.removeAttribute("style");
                    dropdown.classList.remove("open");
                });
            }
        });

        const fileInput = empImgFrame.querySelector(".imageUpload");
        const uploadSvg = empImgFrame.querySelector(".uploadSvg");

        fileInput.addEventListener("change", (event) => {
            handleFile(event, empImgFrame, uploadSvg, empImg);
        });

        tabs.forEach(btn => {
            if (!btn) return;

            if (btn.classList.contains("active")) btn.classList.remove("active");
        });

        LineColors.forEach(line => {
            if (!line) return;

            if (line.classList.contains("LineColorGreen")) line.classList.remove("LineColorGreen");
        });

        LineColors2.forEach(line2 => {
            if (!line2) return;

            if (line2.classList.contains("LineColorGreen2")) line2.classList.remove("LineColorGreen2");
        });

        addEmpBtn.classList.add("active");

        if (lineColor) {
            lineColor.classList.add("LineColorGreen");
        } else if (lineColor2) {
            lineColor2.classList.add("LineColorGreen2");
        }

    } catch (error) {
        console.log(error);
    }
}
