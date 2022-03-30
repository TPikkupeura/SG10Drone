import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import * as appendix2 from '../src/appendix2.json'


export default function Apix2Dropdown() {
    const header = Object.keys(appendix2);

    const [test, setTest] = useState('test1');

    const handleHeaderChange = (event) => {
        setTest(event.target.value);
    };

    return (
        <div>
            <Dropdown
            label="Appendix2"
            options={[
                { label: 'Test1', value: 'test1'},
                { label: 'Test2', value: 'test2'}
            ]}
            value={test}
            onChange={handleHeaderChange}
            />


        </div>
    )
}

const Dropdown = ({ label, value, options, onChange }) => {
    return (
        <label>
            {label}
            <select value={value} onChange={onChange}>
                {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>        
    );
};