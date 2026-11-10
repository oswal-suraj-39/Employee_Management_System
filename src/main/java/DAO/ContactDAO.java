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

	public ResultSet getAllContactDataForCards(String offsetValue) {
		try {
			String sql = "select email from contact order by e_id asc limit 10 offset " + offsetValue;
			System.out.println(sql);
			PreparedStatement ps = this.con.prepareStatement(sql,
					ResultSet.TYPE_SCROLL_INSENSITIVE,
					ResultSet.CONCUR_READ_ONLY
					);
			
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
	
	public int updateContactDataByEID(Employee employee, String[] columnsName, String[] newValues) {
		try {
			int a = 1;
			for (int i = 0; i < columnsName.length && i < newValues.length; i++) {
				switch (columnsName[i]) {
					case "email": {
						String sql = "update contact set email = ? where e_id = ?;";
						PreparedStatement ps = this.con.prepareStatement(sql);
						ps.setString(1, newValues[i]);
						ps.setInt(2, employee.getEID());
						a = ps.executeUpdate();
						break;
					}
					case "address": {
						String sql = "update contact set address = ? where e_id = ?;";
						PreparedStatement ps = this.con.prepareStatement(sql);
						ps.setString(1, newValues[i]);
						ps.setInt(2, employee.getEID());
						a = ps.executeUpdate();
						break;
					}
					case "city": {
						String sql = "update contact set city = ? where e_id = ?;";
						PreparedStatement ps = this.con.prepareStatement(sql);
						ps.setString(1, newValues[i]);
						ps.setInt(2, employee.getEID());
						a = ps.executeUpdate();
						break;
					}
					case "state": {
						String sql = "update contact set state = ? where e_id = ?;";
						PreparedStatement ps = this.con.prepareStatement(sql);
						ps.setString(1, newValues[i]);
						ps.setInt(2, employee.getEID());
						a = ps.executeUpdate();
						break;
					}
					case "country": {
						String sql = "update contact set country = ? where e_id = ?;";
						PreparedStatement ps = this.con.prepareStatement(sql);
						ps.setString(1, newValues[i]);
						ps.setInt(2, employee.getEID());
						a = ps.executeUpdate();
						break;
					}
					case "pincode": {
						String sql = "update contact set pincode = ? where e_id = ?;";
						PreparedStatement ps = this.con.prepareStatement(sql);
						ps.setInt(1, Integer.parseInt(newValues[i]));
						ps.setInt(2, employee.getEID());
						a = ps.executeUpdate();
						break;
					}
					case "phone": {
						String sql = "update contact set phone = ? where e_id = ?;";
						PreparedStatement ps = this.con.prepareStatement(sql);
						ps.setLong(1, Long.parseLong(newValues[i]));
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
}
