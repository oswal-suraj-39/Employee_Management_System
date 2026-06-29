package DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import model.*;
import utility.DBConnection;

public class ContactDAO {
	
	protected Connection con = DBConnection.getConnection();

	public boolean addContact(Contact contact, Employee employee) {
		try {
			
			String sql = 
					"""
					insert into contact(
						e_id,
						email,
						address,
						city,
						state,
						country,
						pincode,
						phone
					) values (?, ?, ?, ?, ?, ?, ?, ?)
					""";
			
			PreparedStatement ps = this.con.prepareStatement(sql);
			
			ps.setInt(1, employee.getEID());
			ps.setString(2, contact.getEmail());
			ps.setString(3, contact.getAddress());
			ps.setString(4, contact.getCity());
			ps.setString(5, contact.getState());
			ps.setString(6, contact.getCountry());
			ps.setInt(7, contact.getPincode());
			ps.setLong(8, contact.getPhone());
			
			int rowsAffected = ps.executeUpdate();
			
			return rowsAffected > 0;
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public ResultSet getAllContactDataForCards() {
		try {
			String sql = 
					"""
					select email
					from contact;
					""";
			
			PreparedStatement ps = this.con.prepareStatement(sql);
			
			ResultSet rs = ps.executeQuery();
			
			return rs;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public ResultSet getContactDataByEID(int eid) {
		try {
			String sql = """
					select *
					from contact
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
