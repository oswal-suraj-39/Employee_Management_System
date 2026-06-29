package utility;
import java.sql.*;
public class TestConnection {

	public static void main(String[] args) {
		Connection conn = DBConnection.getConnection();
		if (conn != null) {
			System.out.println("Postgresql Database connected successfully!");
		}

	}

}
