import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StaffManagement.css'; // Import the CSS file

function StaffManagement() {
    const [staffList, setStaffList] = useState([]);
    const [formData, setFormData] = useState({
        staffNumber: '',
        fullName: '',
        identityNumber: '',
        position: '',
        salary: '',
    });
    const [searchNumber, setSearchNumber] = useState('');
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Track if we are editing

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/staff');
            setStaffList(response.data);
        } catch (error) {
            console.error('There was an error fetching the staff data!', error);
            setMessage('Error fetching staff data.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const existingStaff = staffList.find(staff => staff.staffNumber === formData.staffNumber);
        if (existingStaff && !isEditing) {
            setMessage('Error: Staff number already exists.');
            return;
        }

        const staffData = {
            staffNumber: formData.staffNumber,
            name: formData.fullName,
            identityNumber: formData.identityNumber,
            position: formData.position,
            salary: Number(formData.salary),
        };

        try {
            if (isEditing) {
                const response = await axios.put(`http://localhost:5000/api/staff/${formData.staffNumber}`, staffData);
                setMessage('Staff updated successfully!');
                setStaffList(staffList.map(staff => (staff.staffNumber === formData.staffNumber ? response.data : staff)));
            } else {
                const response = await axios.post('http://localhost:5000/api/staff', staffData);
                setMessage('Staff added successfully!');
                setStaffList([...staffList, response.data]);
            }
            setFormData({ staffNumber: '', fullName: '', identityNumber: '', position: '', salary: '' });
            setIsEditing(false);
        } catch (error) {
            console.error('There was an error adding/updating the staff!', error);
            setMessage('Error adding/updating staff: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const handleDelete = async (staffNumber) => {
        try {
            await axios.delete(`http://localhost:5000/api/staff/${staffNumber}`);
            setMessage('Staff deleted successfully!');
            fetchStaff();
        } catch (error) {
            console.error('There was an error deleting the staff!', error);
            setMessage('Error deleting staff.');
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/api/staff/${searchNumber}`);
            setStaffList([response.data]);
            setMessage('');
        } catch (error) {
            console.error('There was an error searching for the staff!', error);
            setMessage('Staff not found.');
        }
    };

    const handleEdit = (staff) => {
        setFormData({
            staffNumber: staff.staffNumber,
            fullName: staff.name,
            identityNumber: staff.identityNumber,
            position: staff.position,
            salary: staff.salary,
        });
        setIsEditing(true);
    };

    return (
        <div className="container">
            <h1>Staff Management</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="staffNumber" placeholder="Staff Number" value={formData.staffNumber} onChange={handleChange} required />
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                <input type="text" name="identityNumber" placeholder="Identity Number" value={formData.identityNumber} onChange={handleChange} required />
                <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
                <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange ={handleChange} required />
                <button type="submit">{isEditing ? 'Update Staff' : 'Add Staff'}</button>
            </form>

            <form onSubmit={handleSearch}>
                <input type="text" value={searchNumber} onChange={(e) => setSearchNumber(e.target.value)} placeholder="Search by Staff Number" required />
                <button type="submit">Search Staff</button>
            </form>

            {message && <p className="message">{message}</p>}

            <h2>Current Staff List</h2>
            <ul>
                {staffList.map(staff => (
                    <li key={staff.staffNumber}>
                        {staff.name} - {staff.position}
                        <button onClick={() => handleEdit(staff)}>Edit</button>
                        <button onClick={() => handleDelete(staff.staffNumber)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StaffManagement;