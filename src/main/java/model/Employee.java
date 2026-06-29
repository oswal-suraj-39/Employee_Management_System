package model;

public class Employee {

	private int eid;
	private String empid;
	private String firstName;
	private String lastName;
	private String gender;
	private String dob;
	private double salary;
	private String photoPath;
	
	public Employee() {}
	
	public Employee(
			int eid,
			String empid,
			String firstName,
			String lastName,
			String gender,
			String dob,
			double salary,
			String photoPath
			) {
		this.eid = eid;
		this.empid = empid;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.dob = dob;
		this.salary = salary;
		this.photoPath = photoPath;
	}
	
	public int getEID() {
		return eid;
	}
	
	public String getEmpID() {
		return empid;
	}
	
	public String getFirstName() {
		return firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public String getGender() {
		return gender;
	}
	
	public String getDOB() {
		return dob;
	}
	
	public double getSalary() {
		return salary;
	}
	
	public String getPhotoPath() {
		return photoPath;
	}
	
	public void setEID(int eid) {
		this.eid = eid;
	}
	
	public void setEmpID(String empid) {
		this.empid = empid;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	public void setDOB(String dob) {
		this.dob = dob;
	}
	
	public void setSalary(double salary) {
		this.salary = salary;
	}
	
	public void setPhotoPath(String photoPath) {
		this.photoPath = photoPath;
	}
	
}
