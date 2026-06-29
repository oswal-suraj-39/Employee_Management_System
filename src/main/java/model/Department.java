package model;

public class Department {

	private int eid;
	private String deptName;
	private String jobTitle;
	private String empType;
	private String joinDate;
	private String empStatus;
	
	public Department() {}
	
	 public Department(
			 int eid,
			 String deptName,
			 String jobTitle,
			 String empType,
			 String joinDate,
			 String empStatus
			 ) {
		 this.eid = eid;
		 this.deptName = deptName;
		 this.jobTitle = jobTitle;
		 this.empType = empType;
		 this.joinDate = joinDate;
		 this.empStatus = empStatus;
	 }
	 
	 public int getEID() {
		 return eid;
	 }
	 
	 public String getDeptName() {
		 return deptName;
	 }
	 
	 public String getjobTitle() {
		 return jobTitle;
	 }
	 
	 public String getempType() {
		 return empType;
	 }
	 
	 public String getjoinDate() {
		 return joinDate;
	 }

	 public String getempStatus() {
		 return empStatus;
	 }
	 
	 public void setEID(int eid) {
		 this.eid = eid;
	 }
	 
	 public void setDeptName(String deptName) {
		 this.deptName = deptName;
	 }
	 
	 public void setjobTitle(String jobTitle) {
		 this.jobTitle = jobTitle;
	 }
	 
	 public void setempType(String empType) {
		 this.empType = empType;
	 }
	 
	 public void setjoinDate(String joinDate) {
		 this.joinDate = joinDate;
	 }

	 public void setempStatus(String empStatus) {
		 this.empStatus = empStatus;
	 }
	 
}
