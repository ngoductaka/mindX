import React, { useState, useEffect } from 'react';
import axios from 'axios';
export const Temp = () => {
	const [c, setC] = useState('');
	const [f, setF] = useState('');

	const _handleChangeVal = (type, val) => {
		// input not number
		if (isNaN(val)) return 0;

		if (type == 'c') {
			setC(val)
			setF(toFahrenheit(val))
		} else {
			setC(toCelsius(val))
			setF(val)
		}
	}

	return (
		<div>

			<fieldset>
				<legend>Độ C:</legend>
				<input value={c} onChange={e => _handleChangeVal('c', e.target.value)} />
			</fieldset>

			<fieldset>
				<legend>Độ F:</legend>
				<input value={f} onChange={e => _handleChangeVal('f', e.target.value)} />
			</fieldset>

		</div>
	)
}


function toCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
	return (celsius * 9 / 5) + 32;
}


export const TemSplit = () => {
	const [c, setC] = useState('');
	const [f, setF] = useState('');

	const _handleChangeVal = (type, val) => {
		if (isNaN(val)) return 0;

		if (type == 'c') {
			setC(val)
			setF(toFahrenheit(val))
		} else {
			setC(toCelsius(val))
			setF(val)
		}

	}

	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [data, setData] = useState({});
	const _handleLogin = async () => {
		console.log(name, password)
		const data = await axios.post('http://localhost:3000/login', {
			name: name,
			password: password
		})
		setData(data.data)
	}

	return (
		<div>
			{/* <InputForm
				label="Độ C:"
				value={c}
				onChange={val => _handleChangeVal('c', val)}
			/>
			<InputForm
				label="Độ F:"
				value={f}
				onChange={val => _handleChangeVal('f', val)}
			/> */}
			<span>name</span>
			<input value={name} onChange={e => setName(e.target.value)} />
			<span>password</span>
			<input value={password} onChange={e => setPassword(e.target.value)} />
			<div/>
			<button onClick={_handleLogin}>Login</button>
			<div>
				{data.token}
			</div>
		</div>
	)

}

const InputForm = ({
	label = "",
	value = "",
	onChange = () => { }
}) => {
	return (
		<fieldset>
			<legend>{label}</legend>
			<input value={value} onChange={e => onChange(e.target.value)} />
		</fieldset>
	)
}