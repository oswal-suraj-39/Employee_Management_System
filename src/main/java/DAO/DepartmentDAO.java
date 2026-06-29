package DAO;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import model.*;
import utility.DBConnection;


public class DepartmentDAO {
	
	protected Connection con = DBConnection.getConnection();
	
	public boolean addDepartment(Department department, Employee employee) {
		try {
			String sql = 
					"""
					insert into department(
						e_id,
						dept_name,
						job_title,
						employee_type,
						join_date,
						employee_status
					) values (?, ?, ?, ?, ?, ?)
					""";
			
			PreparedStatement ps = this.con.prepareStatement(sql);
			
			ps.setInt(1, employee.getEID());
			ps.setString(2, department.getDeptName());
			ps.setString(3, department.getjobTitle());
			ps.setString(4, department.getempType());
			ps.setDate(5, Date.valueOf(department.getjoinDate()));
			ps.setString(6, department.getempStatus());
			
			int rowsAffected = ps.executeUpdate();
			
			return rowsAffected > 0;
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public ResultSet getAllDepartmentDataForCards() {
		try {
			String sql = 
					"""
					select dept_name, job_title
					from department;
					""";
			
			PreparedStatement ps = this.con.prepareStatement(sql);
			
			ResultSet rs = ps.executeQuery();
			
			return rs;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public ResultSet getDepartmentDataByEID(int eid) {
		try {
			String sql = """
					select *
					from Department
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
