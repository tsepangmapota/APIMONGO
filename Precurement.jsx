import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProcurementManagement.css'; // Import your CSS file

function ProcurementManagement() {
    const [vehicles, setVehicles] = useState([]);
    const [formData, setFormData] = useState({
        vin: '',
        model: '',
        mileage: '',
        driver: '',
        status: 'available',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/vehicles');
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            setMessage('Error fetching vehicles.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Update existing vehicle
                const response = await axios.put(`http://localhost:5000/api/vehicles/${formData.vin}`, formData);
                setMessage('Vehicle updated successfully!');
                setVehicles(vehicles.map(vehicle => (vehicle.vin === formData.vin ? response.data : vehicle)));
            } else {
                // Add new vehicle
                const response = await axios.post('http://localhost:5000/api/vehicles', formData);
                setMessage('Vehicle added successfully!');
                setVehicles([...vehicles, response.data]);
            }
            // Reset form after submission
            setFormData({ vin: '', model: '', mileage: '', driver: '', status: 'available' });
            setIsEditing(false);
        } catch (error) {
            console.error('Error adding/updating vehicle:', error);
            setMessage('Error adding/updating vehicle: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const handleDelete = async (vin) => {
        try {
            await axios.delete(`http://localhost:5000/api/vehicles/${vin}`);
            setMessage('Vehicle deleted successfully!');
            fetchVehicles(); // Refresh the vehicle list
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            setMessage('Error deleting vehicle.');
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/api/vehicles?search=${searchTerm}`);
            setVehicles(response.data); // Show only the searched vehicles
            setMessage('');
        } catch (error) {
            console.error('Error searching for vehicles:', error);
            setMessage('Error searching for vehicles.');
        }
    };

    const handleEdit = (vehicle) => {
        setFormData({
            vin: vehicle.vin,
            model: vehicle.model,
            mileage: vehicle.mileage,
            driver: vehicle.driver,
            status: vehicle.status,
        });
        setIsEditing(true);
    };

    return (
        <div className="container">
            <h1>Vehicle Management</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="vin" placeholder="VIN" value={formData.vin} onChange={handleChange} required />
                <input type="text" name="model" placeholder="Model" value={formData.model} onChange={handleChange} required />
                <input type="number" name="mileage" placeholder="Mileage" value={formData.mileage} onChange={handleChange} required />
                <input type="text" name="driver" placeholder="Driver" value={formData.driver} onChange={handleChange} required />
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="available">Available</option>
                    <option value="in use">In Use</option>
                    <option value="on service">On Service</option>
                    <option value="sold on auction">Sold on Auction</option>
                </select>
                <button type="submit">{isEditing ? 'Update Vehicle' : 'Add Vehicle'}</button>
            </form>

            <form onSubmit={handleSearch}>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by VIN" required />
                <button type="submit">Search Vehicle</button>
            </form>

            {message && <p className="message">{message}</p>}

            <h2>Current Vehicle List</h2>
            <ul>
                {vehicles.map(vehicle => (
                    <li key={vehicle.vin}>
                        {vehicle.model} - VIN: {vehicle.vin} - Mileage: {vehicle.mileage} - Driver: {vehicle.driver} - Status: {vehicle.status}
                        <button onClick={() => handleEdit(vehicle)}>Edit</button>
                        <button onClick={() => handleDelete(vehicle.vin)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProcurementManagement;
