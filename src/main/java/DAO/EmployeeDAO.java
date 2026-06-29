package DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Date;
import java.sql.ResultSet;

import utility.DBConnection;
import model.*;

public class EmployeeDAO {
	
	protected Connection con = DBConnection.getConnection();
	
	public boolean addEmployee(Employee employee) {
		try {	
			String sql1 = 
					"""
					insert into employees(
						employee_id,
						first_name,
						last_name,
						gender,
						dob,
						salary,
						photo_path
					) values (?, ?, ?, ?, ?, ?, ?)
					""";
			
			PreparedStatement ps = this.con.prepareStatement(sql1);
			
			ps.setString(1, employee.getEmpID());
			ps.setString(2, employee.getFirstName());
			ps.setString(3, employee.getLastName());
			ps.setString(4, employee.getGender());
			ps.setDate(5, Date.valueOf(employee.getDOB()));
			ps.setDouble(6, employee.getSalary());
			ps.setString(7, employee.getPhotoPath());
			
			int rowsAffected = ps.executeUpdate();
			
			return rowsAffected > 0;
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	public ResultSet getEmployeeID(Employee employee) {
		try {
			String sql = 
					"""
					select e_id 
					from employees 
					where employee_id = ?;
					""";
			
			PreparedStatement ps = con.prepareStatement(sql);
			
			ps.setString(1, employee.getEmpID());
			
			ResultSet rs = ps.executeQuery();
			
			return rs;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public ResultSet getAllEmployeeDataForCards() {
		try {
			String sql = 
					"""
					select e_id, employee_id, first_name, last_name, photo_path
					from employees;
					""";
			
			PreparedStatement ps = this.con.prepareStatement(sql);
			
			ResultSet rs = ps.executeQuery();
			
			return rs;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public ResultSet getTotalCountOFEID() {
		try {
			String sql = 
					"""
					select count(e_id)
					from employees;
					""";
			
			PreparedStatement ps = this.con.prepareStatement(sql);
			
			ResultSet rs = ps.executeQuery();
			
			return rs;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public ResultSet getEmployeeDataByEID(int eid) {
		try {
			String sql = """
					select *
					from employees
					where e_id = ?;
					""";
			
			PreparedStatement ps = this.con.prepareStatement(sql);
			
			ps.setInt(1, eid);
			
			ResultSet rs = ps.executeQuery();
			
			return rs;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
