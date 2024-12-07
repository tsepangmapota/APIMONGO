import React from 'react';
import './HomePage.css'; // Import your CSS file for styling

function HomePage() {
    return (
        <div className="home-container">
            <h1>Welcome to the HR Management System</h1>
            <p>Your One-Stop Solution for Managing Staff and HR Processes</p>
            <p>
                Our comprehensive system is designed to streamline and enhance the management of staff and HR processes, ensuring that your organization operates efficiently and effectively. The platform offers the following features:
            </p>

            <h2>1. Staff Information Management</h2>
            <ul>
                <li>
                    <strong>New Employee Onboarding:</strong> Easily add newly recruited staff members, including essential details such as employee staff number, full name, identity number, qualifications, job position, and salary. This feature helps you keep track of your workforce and ensures that all relevant information is accurately recorded from the start.
                </li>
                <li>
                    <strong>Employee Updates and Search:</strong> Quickly update and manage existing employee details to keep your records up-to-date. The search functionality allows you to locate employee information with ease, saving time and effort in administrative tasks.
                </li>
                <li>
                    <strong>Staff Termination:</strong> Remove records of staff who have left the company due to the termination of their employment contracts, maintaining an organized and current staff database.
                </li>
            </ul>

            <h2>2. Professional Development Tracking</h2>
            <ul>
                <li>
                    <strong>Qualification Tracking:</strong> Monitor the progress of staff as they acquire new qualifications through academic and professional training programs. This helps in maintaining a comprehensive profile for each employee, reflecting their educational and career advancements.
                </li>
                <li>
                    <strong>Points-Based Skill Accumulation:</strong> Employees’ profiles accumulate points as they enhance their skills. Academic training earns 5 points per qualification, while professional training awards 7 points per course completed. These points contribute to career growth and can be used as an advantage for internal promotions and appointments.
                </li>
                <li>
                    <strong>Internal Appointments:</strong> The points accumulated through professional development serve as additional criteria for appointment considerations in internally advertised positions. This incentivizes staff members to pursue further education and training, fostering a culture of continuous professional growth and excellence.
                </li>
            </ul>

            <h2>3. Procurement and Vehicle Management</h2>
            <ul>
                <li>
                    <strong>Company Vehicle Records:</strong> Add and maintain comprehensive records of company vehicles, including essential details such as Vehicle Identification Number (VIN), model, mileage, and driver assignments. The system can recommend drivers based on employee data, optimizing the allocation of vehicles to qualified staff members.
                </li>
                <li>
                    <strong>Vehicle Updates and Maintenance:</strong> Keep vehicle records current by updating mileage and driver information as new data becomes available. This ensures that you have an accurate overview of your vehicle fleet and its usage.
                </li>
                <li>
                    <strong>Vehicle Search Functionality:</strong> Easily search for vehicles based on various criteria, allowing you to access information quickly when needed.
                </li>
                <li>
                    <strong>Vehicle Status Overview:</strong> The system provides an up-to-date status for each vehicle, indicating whether it is available, in use, on service, or sold at auction. This transparency helps in managing vehicle logistics effectively.
                </li>
            </ul>
        </div>
    );
}

export default HomePage;
