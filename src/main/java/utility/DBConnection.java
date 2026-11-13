package utility;

import java.sql.*;

public class DBConnection {

	public static Connection getConnection() {
		
		try {
			String url = "jdbc:postgresql://localhost:5432/YourDatabaseName";
			String user = "YourUserName";
			String pw = "YourPassword";
			
			Class.forName("org.postgresql.Driver");
		
			Connection con = DriverManager.getConnection(url, user, pw);
			
			return con;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

}
