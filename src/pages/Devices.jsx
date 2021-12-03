import '../App.css';
import { useState, useEffect } from 'react';
import { devices } from '../components/DevicesList';

const Devices =()=>{
    const [phones, setPhones]=useState(null);
    useEffect(()=>{
        setPhones(devices);
    }, []);
    const values=[
        'Apple',
        'Samsung',
        'Xiaomi',
    ]
    const onChange = (e)=>{
        if(e.target.value ==""){
            setPhones(devices);
            return;
        }
        setPhones(devices.filter((device)=>device.brand===e.target.value))
    };
    return (
        <div className="container">
        <h3>All Devices</h3>
        <select className="browser-default" onChange={onChange}>
            <option value="">
                Choose brand
            </option>
            {values.map( (val,key) => <option key={key} value={val}>{val} </option>)}
        </select>

        <table>
            <thead>
                 <tr>
                    {Object.keys(devices[0]).map((field,key) =>(
                        <th key ={key}>{field}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {phones && phones.map((value)=>
                <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>{value.brand}</td>
                    <td>{value.name}</td>
                    <td>{value.description}</td>
                    <td>{value.price}</td>
                </tr>
                )}
            </tbody>
        </table>
            
    </div>
);
};
    
   

export default Devices;