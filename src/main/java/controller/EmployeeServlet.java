package controller;

import java.io.File;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.sql.ResultSet;

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
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");

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
				
				if (bool1) {
					System.out.println("insertion employee data successfully");
					
					ResultSet rs = eDAO.getEmployeeID(emp);
					
					while (rs.next()) {
						emp.setEID(rs.getInt("e_id"));
					}

					boolean bool2 = cDAO.addContact(cont, emp);
					boolean bool3 = dDAO.addDepartment(dept, emp);
					
					if (bool2) {
						System.out.println("insertion employee contact data successfully");
					} else {
						System.out.println("insertion employee contact data unsuccessfully");
					}
					
					if (bool3) {
						System.out.println("insertion employee department data successfully");
					} else {
						System.out.println("insertion employee department data unsuccessfully");
					}
					
					rs.close();
					
				} else {
					System.out.println("insertion employee data unsuccessfully");
				}
			}
			
			String requestedAction = request.getParameter("action");
			System.out.println("requestedAction = "+requestedAction);
			
			if (requestedAction != null && requestedAction.equals("viewAllEmployees")) {
				
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
					
					emp[j].put("eid", employee[j].getEID());
					emp[j].put("empID", employee[j].getEmpID());
					emp[j].put("empFirstName", employee[j].getFirstName());
					emp[j].put("empLastName", employee[j].getLastName());
					emp[j].put("empPhoto", employee[j].getPhotoPath());
					
					emp[j].put("empEmail", contact[j].getEmail());
					emp[j].put("empDeptName", department[j].getDeptName());
					emp[j].put("empJobTitle", department[j].getjobTitle());
					
					employees.put(emp[j]);
				}
				
				response.getWriter().print(employees);
			}
			
			String EID = request.getParameter("EID");
			if (requestedAction != null && requestedAction.equals("getEmployeeDataByID") && EID != null) {
				
				int eid = Integer.parseInt(EID);
				
				Employee employee = new Employee();
				
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

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
