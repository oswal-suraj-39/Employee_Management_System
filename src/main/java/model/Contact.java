package model;

public class Contact {

	
	private String email;
	private String address;
	private String city;
	private String state;
	private String country;
	private int pincode;
	private long phone;
	
	public Contact() {}
	
	public Contact(
			String email,
			String address,
			String city,
			String state,
			String country,
			int pincode,
			long phone
			) {
		this.email = email;
		this.address = address;
		this.city = city;
		this.state = state;
		this.country = country;
		this.pincode = pincode;
		this.phone = phone;
	}
	
	public String getEmail() {
		return email;
	}
	
	public String getAddress() {
		return address;
	}
	
	public String getCity() {
		return city;
	}
	
	public String getState() {
		return state;
	}
	
	public String getCountry() {
		return country;
	}
	
	public int getPincode() {
		return pincode;
	}
	
	public long getPhone() {
		return phone;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public void setCity(String city) {
		this.city = city;
	}
	
	public void setState(String state) {
		this.state = state;
	}
	
	public void setCountry(String country) {
		this.country = country;
	}
	
	public void setPincode(int pincode) {
		this.pincode = pincode;
	}
	
	public void setPhone(long phone) {
		this.phone = phone;
	}
	
}
