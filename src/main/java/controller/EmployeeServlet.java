package controller;

import java.io.File;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import java.sql.ResultSet;
import java.util.Arrays;

import org.json.JSONArray;
import org.json.JSONObject;
import java.sql.Date;

import DAO.*;
import model.*;

@MultipartConfig
@WebServlet("/EmployeeServlet")
public class EmployeeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
				
		try {			
			String empID = request.getParameter("empID");
			String empFirstName = request.getParameter("empFirstName");
			String empLastName = request.getParameter("empLastName");
			String empGender = request.getParameter("empGender");
			String empDOB = request.getParameter("empDOB");
			String empSalary = request.getParameter("empSalary");
			Part photoPart = request.getPart("empPhoto");
			String empEmail = request.getParameter("empEmail");
			String empPhone = request.getParameter("empPhone");
			String empAddress = request.getParameter("empAddress");
			String empCity = request.getParameter("empCity");
			String empState = request.getParameter("empState");
			String empCountry = request.getParameter("empCountry");
			String empPincode = request.getParameter("empPincode");

			String empDeptName = request.getParameter("empDeptName");
			String empJobTitle = request.getParameter("empJobTitle");
			String empType = request.getParameter("empType");
			String empJoinDate = request.getParameter("empJoinDate");
			String empStatus = request.getParameter("empStatus");
			
			if (empID != null && 
				empFirstName != null &&
				empLastName != null &&
				empGender != null &&
				empDOB != null &&
				empSalary != null &&
				photoPart != null &&
				empEmail != null &&
				empPhone != null &&
				empAddress != null &&
				empCity != null &&
				empState != null &&
				empCountry != null &&
				empPincode != null &&
				empDeptName != null &&
				empJobTitle != null &&
				empType != null &&
				empJoinDate != null &&
				empStatus != null) {
				
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");

				String fileName = photoPart.getSubmittedFileName();
				String uploadPath = "C:\\Users\\hp\\eclipse-workspace\\EmployeeManagementSystem\\src\\main\\webapp\\upload";
				File uploadDir = new File(uploadPath);
				if (!uploadDir.exists()) {
					uploadDir.mkdir();
				}
				photoPart.write(uploadPath + File.separator + fileName);
				String photoPath = "./upload/" + fileName;
			
				Employee emp = new Employee();
				Contact cont = new Contact();
				Department dept = new Department();
				
				emp.setEmpID(empID);
				emp.setFirstName(empFirstName);
				emp.setLastName(empLastName);
				emp.setGender(empGender);
				emp.setDOB(empDOB);
				emp.setSalary(Double.parseDouble(empSalary));
				emp.setPhotoPath(photoPath);

				cont.setEmail(empEmail);
				cont.setAddress(empAddress);
				cont.setCity(empCity);
				cont.setState(empState);
				cont.setCountry(empCountry);
				cont.setPincode(Integer.parseInt(empPincode));
				cont.setPhone(Long.parseLong(empPhone));
				
				dept.setDeptName(empDeptName);
				dept.setjobTitle(empJobTitle);
				dept.setempType(empType);
				dept.setjoinDate(empJoinDate);
				dept.setempStatus(empStatus);
				
				EmployeeDAO eDAO = new EmployeeDAO();
				ContactDAO cDAO = new ContactDAO();
				DepartmentDAO dDAO = new DepartmentDAO();
				
				boolean bool1 = eDAO.addEmployee(emp);

				JSONObject status = new JSONObject();
				
				if (bool1) {
					System.out.println("insertion employee data successfully");
					status.put("employeeData", "ok");

					ResultSet rs = eDAO.getEmployeeID(emp);

					while (rs.next()) {
						emp.setEID(rs.getInt("e_id"));
					}

					boolean bool2 = cDAO.addContact(cont, emp);
					
					if (bool2) {
						System.out.println("insertion employee contact data successfully");
						status.put("employeeContactData", "ok");

						boolean bool3 = dDAO.addDepartment(dept, emp);
						
						if (bool3) {
							System.out.println("insertion employee department data successfully");
							status.put("employeeDepartmentData", "ok");
						} else {
							System.out.println("insertion employee department data unsuccessfully");
							status.put("employeeDepartmentData", "error");
						}

					} else {
						System.out.println("insertion employee contact data unsuccessfully");
						status.put("employeeContactData", "error");
					}
					
					response.getWriter().print(status);
					rs.close();
					
				} else {
					System.out.println("insertion employee data unsuccessfully");
					status.put("employeeData", "error");
					response.getWriter().print(status);
				}
			}
			
			String requestedAction = request.getParameter("action");			
			String EID = request.getParameter("EID");
			String[] columnsName = request.getParameterValues("columnsName");
			String[] newValues = request.getParameterValues("newValues");
			String category = request.getParameter("Category");
			
			if (requestedAction != null) {
				
				switch (requestedAction) {
					case "viewAllEmployees": {
						response.setContentType("application/json");
						response.setCharacterEncoding("UTF-8");
	
						EmployeeDAO eDAO = new EmployeeDAO();
						ContactDAO cDAO = new ContactDAO();
						DepartmentDAO dDAO = new DepartmentDAO();
						
						ResultSet rs1 = eDAO.getAllEmployeeDataForCards();
						ResultSet rs4 = eDAO.getTotalCountOFEID();
						ResultSet rs2 = cDAO.getAllContactDataForCards();
						ResultSet rs3 = dDAO.getAllDepartmentDataForCards();
						
						int size = 0, i = 0;
						
						while (rs4.next()) {
							size = rs4.getInt("count");
						}
						
						Employee[] employee = new Employee[size];
						Contact[] contact = new Contact[size];
						Department[] department = new Department[size];
						
						JSONArray employees = new JSONArray();
						JSONObject[] emp = new JSONObject[size];
						
						// employee_id, first_name, last_name, photo_path, email, dept_name, job_title
						
						while (rs1.next() && rs2.next() && rs3.next()){	
							employee[i] = new Employee();
							contact[i] = new Contact();
							department[i] = new Department();
							
							employee[i].setEID(rs1.getInt("e_id"));
							employee[i].setEmpID(rs1.getString("employee_id"));
							employee[i].setFirstName(rs1.getString("first_name"));
							employee[i].setLastName(rs1.getString("last_name"));
							employee[i].setPhotoPath(rs1.getString("photo_path"));;
							
							contact[i].setEmail(rs2.getString("email"));
							
							department[i].setDeptName(rs3.getString("dept_name"));
							department[i].setjobTitle(rs3.getString("job_title"));
							
							i++;
						}
						
						for (int j = 0; j < size; j++) {
							emp[j] = new JSONObject();
							
							if (employee[j].getEID() != 0) {
								emp[j].put("eid", employee[j].getEID());
								emp[j].put("empID", employee[j].getEmpID());
								emp[j].put("empFirstName", employee[j].getFirstName());
								emp[j].put("empLastName", employee[j].getLastName());
								emp[j].put("empPhoto", employee[j].getPhotoPath());
							
								emp[j].put("empEmail", contact[j].getEmail());
								emp[j].put("empDeptName", department[j].getDeptName());
								emp[j].put("empJobTitle", department[j].getjobTitle());
								
								employees.put(emp[j]);
							} else {
								emp[j].put("status", "error");
								employees.put(emp[j]);
								return;
							}
							
						}
						
						response.getWriter().print(employees);
	
						rs1.close();
						rs2.close();
						rs3.close();
						rs4.close();
						break;
					}
					
					case "getEmployeeDataByID": {
						if (EID != null) {
							response.setContentType("application/json");
							response.setCharacterEncoding("UTF-8");
	
							int eid = Integer.parseInt(EID);
							
							EmployeeDAO eDAO = new EmployeeDAO();
							ContactDAO cDAO = new ContactDAO();
							DepartmentDAO dDAO = new DepartmentDAO();
							
							ResultSet rs1 = eDAO.getEmployeeDataByEID(eid);
							ResultSet rs2 = cDAO.getContactDataByEID(eid);
							ResultSet rs3 = dDAO.getDepartmentDataByEID(eid);
							
							JSONObject empData = new JSONObject();
							while (rs1.next() && rs2.next() && rs3.next()) {
								empData.put("empID",rs1.getString("employee_id"));
								empData.put("empFirstName",rs1.getString("first_name"));
								empData.put("empLastName",rs1.getString("last_name"));
								empData.put("empGender",rs1.getString("gender"));
								empData.put("empDOB",Date.valueOf(rs1.getString("dob")));
								empData.put("empSalary",rs1.getDouble("salary"));
								empData.put("empPhoto",rs1.getString("photo_path"));
	
								empData.put("empEmail",rs2.getString("email"));
								empData.put("empAddress",rs2.getString("address"));
								empData.put("empCity",rs2.getString("city"));
								empData.put("empState",rs2.getString("state"));
								empData.put("empCountry",rs2.getString("country"));
								empData.put("empPincode",rs2.getInt("pincode"));
								empData.put("empPhone",rs2.getLong("phone"));
	
								empData.put("empDeptName",rs3.getString("dept_name"));
								empData.put("empJobTitle",rs3.getString("job_title"));
								empData.put("empType",rs3.getString("employee_type"));
								empData.put("empJoinDate",Date.valueOf(rs3.getString("join_date")));
								empData.put("empStatus",rs3.getString("employee_status"));
							}
							
							response.getWriter().print(empData);
						}
						break;
					}
					
					case "updateEmployeeDataByID": {
						if (empID != null &&
							columnsName != null &&
							newValues != null) {
							
							response.setContentType("application/json");
							response.setCharacterEncoding("UTF-8");
							
							Employee emp = new Employee();
							emp.setEmpID(empID);
							
							if (photoPart != null && Arrays.asList(columnsName).contains("photo_path")) {
								String fileName = photoPart.getSubmittedFileName();
								String uploadPath = "C:\\Users\\hp\\eclipse-workspace\\EmployeeManagementSystem\\src\\main\\webapp\\upload";
								File uploadDir = new File(uploadPath);
								if (!uploadDir.exists()) {
									uploadDir.mkdir();
								}
								photoPart.write(uploadPath + File.separator + fileName);
								String photoPath = "./upload/" + fileName;
								emp.setPhotoPath(photoPath);
							}
							
							EmployeeDAO eDAO = new EmployeeDAO();
							ContactDAO cDAO = new ContactDAO();
							DepartmentDAO dDAO = new DepartmentDAO();
							ResultSet rs = eDAO.getEmployeeID(emp);
							
							while (rs.next()) {
								emp.setEID(rs.getInt("e_id"));
							}
							
							int bool1 = eDAO.updateEmployeeDataByEID(emp, columnsName, newValues);
							int bool2 = cDAO.updateContactDataByEID(emp, columnsName, newValues);
							int bool3 = dDAO.updateDepartmentDataByEID(emp, columnsName, newValues);
							
							JSONObject result = new JSONObject();
							
							if (bool1 != 0) {
								result.put("EmployeeDataUpdate", "ok");
							} else {
								result.put("EmployeeDataUpdate", "error");
							}
							if (bool2 != 0) {
								result.put("ContactDataUpdate", "ok");
							} else {
								result.put("ContactDataUpdate", "error");
							}
							if (bool3 != 0) {
								result.put("DepartmentDataUpdate", "ok");
							} else {
								result.put("DepartmentDataUpdate", "error");
							}
							
							response.getWriter().print(result);
						}
						break;
					}
					
					case "deleteEmployeeDataByID": {
						if (empID != null) {
							
							response.setContentType("application/json");
							response.setCharacterEncoding("UTF-8");
							
							Employee emp = new Employee();
							emp.setEmpID(empID);
							
							EmployeeDAO eDAO = new EmployeeDAO();
							ResultSet rs = eDAO.getEmployeeID(emp);
							
							while (rs.next()) {
								emp.setEID(rs.getInt("e_id"));
							}
							
							int bool1 = eDAO.deleteEmployeeDataByEID(emp);
							JSONObject result = new JSONObject();
							
							if (bool1 != 0) {
								result.put("EmployeeDataDelete", "ok");
							} else {
								result.put("EmployeeDataDelete", "error");
							}
							response.getWriter().print(result);
						}
						break;
					}
					
					case "counterPanelData": {
						
						response.setContentType("application/json");
						response.setCharacterEncoding("UTF-8");
							
						EmployeeDAO eDAO = new EmployeeDAO();
						DepartmentDAO dDAO = new DepartmentDAO();
						
						long cnt1 = eDAO.getTotalCountOfEID();
						long cnt2 = dDAO.getTotalCountOfActiveEmployee();
						long cnt3 = dDAO.getTotalCountOfInActiveEmployee();
						long cnt4 = dDAO.getTotalCountOfDepartment();
						
						JSONObject result = new JSONObject();
							
						result.put("TotalCountOfEID", cnt1);
						result.put("TotalCountOfActiveEmployee", cnt2);
						result.put("TotalCountOfInActiveEmployee", cnt3);
						result.put("TotalCountOfDepartment", cnt4);
						
						response.getWriter().print(result);
						
						break;
					}
					
					case "fetchFilterOptions": {
						
						response.setContentType("application/json");
						response.setCharacterEncoding("UTF-8");
						
						JSONObject result = new JSONObject();
					    DepartmentDAO dDAO = new DepartmentDAO();
						
					    if ("byDepartment".equals(category)) {

					        JSONArray deptNameList = new JSONArray();
					        ResultSet rs = dDAO.getUniqueDepartmentName();

					        while (rs.next()) {
					            deptNameList.put(rs.getString("dept_name"));
					        }

					        result.put("deptNameList", deptNameList);
					    } else if ("byJobRole".equals(category)) {

					        JSONArray jobTitleList = new JSONArray();
					        ResultSet rs = dDAO.getUniqueJobTitle();

					        while (rs.next()) {
					            jobTitleList.put(rs.getString("job_title"));
					        }

					        result.put("jobTitleList", jobTitleList);
					    } else {
					        result.put("status", "error");
					    }
					    
					    response.getWriter().print(result);
						
						break;
					}
	
					default:
						System.out.println("other action requested!");
						break;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			JSONObject status = new JSONObject();
			status.put("status","error");
			response.getWriter().print(status);
		}
	}

}
