import React, { useState, useEffect } from 'react';
export const Temp = () => {
	const [state, setState] = useState([
		['', '', ''],
		['', '', ''],
		['', '', ''],
	])
	const _handleClick = (row, col) => {
		console.log(row, col)
		state[row][col] = 'X';
		setState([...state]);
	}
	return (
		<div style={{ margin: 20, }}>
			{
				state.map((item, row) => {
					return <Row {...{ item, row, _handleClick }} />
				})
			}
		</div>
	)
}

const Row = ({ item, row, _handleClick }) => {
	return (
		<div style={{ display: 'flex' }}>
			{item.map((i, col) => {
				return <div
					onClick={() => _handleClick(row, col)}
					style={{
						height: 70, width: 70, border: '1px solid #ddd',
						display: 'flex', justifyContent: 'center', alignItems: 'center'
					}}> {i}
				</div>
			})}

		</div>
	)
}