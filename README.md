# Employee Management System (EMS)

An Employee Management System built using **HTML, CSS, JavaScript, Java Servlets, JDBC, and PostgreSQL**. This web application helps manage employee records, contact information, department details, and employee-related operations through a user-friendly dashboard.

## 📌 Project Overview

The Employee Management System (EMS) is designed to simplify employee record management within an organization.

It provides a centralized interface to register employees, view employee information, update records, delete employees, and manage employee details efficiently.

The application uses Java Servlets and JDBC for backend processing and PostgreSQL for database management.

## ✨ Features

### Employee Management
- Register new employees.
- View employee information.
- Update existing employee records.
- Delete employee records.
- Upload and manage employee profile photos.
- Search employees.
- Filter employees using available categories.
- Navigate employee records using pagination.
- Employee summary cards.
- Employee statistics and charts.
- Search and filtering interface.
- Live digital clock.
- PostgreSQL database integration.
- JDBC-based database connectivity.
- Relational database structure.
- Employee, contact, and department information management.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Web page structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Frontend functionality and DOM manipulation |
| Material Design 3 | User interface design |
| Java | Backend programming |
| Java Servlets | HTTP request and response handling |
| JDBC | Database connectivity |
| PostgreSQL | Relational database |
| Apache Tomcat | Java web application server |
| Eclipse IDE | Java development environment |

## 🗄️ Database Structure

The application uses PostgreSQL to store employee-related information.

The database is organized into the following main tables:

### 1. Employees
Stores basic employee information.

- Employee ID
- First Name
- Last Name
- Gender
- Date of Birth
- Salary
- Photo Path

### 2. Contact
Stores employee contact information.

- Email
- Phone
- Address
- City
- State
- Country
- Pincode

### 3. Department
Stores employee job and department information.

- Department
- Job Title
- Employee Type
- Join Date
- Employee Status

*Note: Actual column names and relationships may vary according to the database implementation.*

## ⚙️ Requirements

Before running the project, make sure you have installed:

- Java Development Kit (JDK)
- Apache Tomcat
- PostgreSQL
- PostgreSQL JDBC Driver
- Eclipse IDE or another Java IDE

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/oswal-suraj-39/Employee_Management_System.git
```

### 2. Configure PostgreSQL

1. Start your PostgreSQL server.
2. Create a database for the project.
3. Create the required tables.
4. Configure the database connection details in your Java project
   ```File location
   Employee_Management_System/src/main/java/utility/DBConnection.java
   ```

### 3. Configure Database Connection

Update your database connection settings:

- Database URL
- Database name
- Username
- Password
```File location
   Employee_Management_System/src/main/java/utility/DBConnection.java
```

Make sure your PostgreSQL JDBC driver is available in the project.

### 4. Configure Apache Tomcat

1. Import the project into Eclipse IDE.
2. Configure Apache Tomcat.
3. Add the project to the Tomcat server.
4. Start the server.

### 5. Run the Application

Open your browser and access the application using your local Tomcat server URL.

```text
http://localhost:8080/EmployeeManagementSystem/
```

*The context path may differ depending on your project configuration.*

## 🔒 Security & Data Management

- Keep database credentials private.
- Do not upload sensitive employee information.
- Use fictional employee records for demonstrations.
- Configure file upload restrictions.
- Back up your PostgreSQL database regularly.

## 🎯 Project Objective

The main objective of this project is to develop a practical understanding of full-stack web application development using Java technologies.

It demonstrates the integration of frontend technologies, Java Servlets, JDBC, and PostgreSQL to build a database-driven web application.

## 👨‍💻 Developer

**Suraj Oswal**

- GitHub: [oswal-suraj-39](https://github.com/oswal-suraj-39)

## 📄 License

This project is available for educational and learning purposes.
