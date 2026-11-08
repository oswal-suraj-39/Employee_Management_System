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
			String sql1 = "insert into employees( employee_id, first_name, last_name, gender, dob, salary, photo_path ) values (?, ?, ?, ?, ?, ?, ?)";
			
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
			String sql = "select e_id from employees where employee_id = ?;";
			
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
			String sql = "select e_id, employee_id, first_name, last_name, photo_path from employees order by e_id asc;";
			
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
					"select count(e_id) from employees;";
			
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
			String sql = "select * from employees where e_id = ?;";
			
			PreparedStatement ps = this.con.prepareStatement(sql);
			
			ps.setInt(1, eid);
			
			ResultSet rs = ps.executeQuery();
			
			return rs;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public int updateEmployeeDataByEID(Employee employee, String[] columnsName, String[] newValues) {
		try {
			int a = 1;
			for (int i = 0; i < columnsName.length && i < newValues.length; i++) {
				switch (columnsName[i]) {
					case "first_name": {
						String sql = "update employees set first_name = ? where e_id = ?;";
						PreparedStatement ps = this.con.prepareStatement(sql);
						ps.setString(1, newValues[i]);
						ps.setInt(2, employee.getEID());
						a = ps.executeUpdate();
						break;
					}
					case "last_name": {
						String sql = "update employees set last_name = ? where e_id = ?;";
						PreparedStatement ps = this.con.prepareStatement(sql);
						System.out.println(newValues[i]);
						ps.setString(1, newValues[i]);
						ps.setInt(2, employee.getEID());
						a = ps.executeUpdate();
						break;
					}
					case "gender": {
						String sql = "update employees set gender = ? where e_id = ?;";
						PreparedStatement ps = this.con.prepareStatement(sql);
						ps.setString(1, newValues[i]);
						ps.setInt(2, employee.getEID());
						a = ps.executeUpdate();
						break;
					}
					case "dob": {
						String sql = "update employees set dob = ? where e_id = ?;";
						PreparedStatement ps = this.con.prepareStatement(sql);
						ps.setDate(1, Date.valueOf(newValues[i]));
						ps.setInt(2, employee.getEID());
						a = ps.executeUpdate();
						break;
					}
					case "salary": {
						String sql = "update employees set salary = ? where e_id = ?;";
						PreparedStatement ps = this.con.prepareStatement(sql);
						ps.setDouble(1, Double.parseDouble(newValues[i]));
						ps.setInt(2, employee.getEID());
						a = ps.executeUpdate();
						break;
					}
					case "photo_path": {
						String sql = "update employees set photo_path = ? where e_id = ?;";
						PreparedStatement ps = this.con.prepareStatement(sql);
						ps.setString(1, employee.getPhotoPath());
						ps.setInt(2, employee.getEID());
						a = ps.executeUpdate();
						break;
					}
					default: {
						continue;
					}
				}
			}
			return a;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	public int deleteEmployeeDataByEID(Employee employee) {
		try {
			String sql = "delete from employees where e_id = ?;";
			PreparedStatement ps = this.con.prepareStatement(sql);
			ps.setInt(1, employee.getEID());
			int a = ps.executeUpdate();
			return a;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	public long getTotalCountOfEID() {
		try {
			long cnt = 0;
			String sql = "select count(e_id) from employees";
			PreparedStatement ps = this.con.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				cnt = rs.getLong("count");
			}
			return cnt;
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}
	
	public ResultSet getGenderTypesTotal() {
		try {
			String sql = "SELECT COUNT(*) FILTER (WHERE gender = 'male') AS total_males, COUNT(*) FILTER (WHERE gender = 'female') AS total_females, COUNT(*) FILTER (WHERE gender = 'other') AS total_others FROM employees;";
			PreparedStatement ps = this.con.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			return rs;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
}
