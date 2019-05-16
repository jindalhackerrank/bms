import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import layout from './data';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			layout: layout,
			nSeats: 1,
			selectedCategory: undefined,
    };
    this.nSeats = 1;
		this.setSeats = this.setSeats.bind(this);
	}

	renderRowHeader(category, price) {
		return (
			<div className="layout-list-item">
				<span>{category}</span>
				<span className="seat-price">{`Rs.${price}`}</span>
			</div>
		);
	}

	setSeats() {
		this.setState({ nSeats: this.nSeats.value });
	}

	getSelectedSeats(layout = this.state.layout, selectedCategory = this.state.selectedCategory) {
    let seatsSelected = 0;
    if(layout && selectedCategory){
		layout[selectedCategory].rows.map(value => {
			value.seats.map(seat => {
				if (seat.status === 'selected') seatsSelected++;
			});
    });
  }
		return seatsSelected;
	}

	toggleSeat(seatNumber, row, category) {
		let layout = JSON.parse(JSON.stringify(this.state.layout));
		for (var i in layout) {
			if (layout.hasOwnProperty(i) && i !== category) {
				layout[i].rows.map(value => {
					value.seats.map(seat => {
						if (seat.status !== 'occupied') seat.status = 'empty';
					});
				});
			}
		}
		let totalSelectedSeats = this.getSelectedSeats(layout, category);
		let rowIndex = layout[category].rows.findIndex(value => value.row === row);
		let seat = layout[category]['rows'][rowIndex].seats.filter(value => value.seatNumber === seatNumber)[0];
		if (seat.status === 'empty') {
			if (totalSelectedSeats === parseInt(this.nSeats.value)) {
				let totalRows = layout[category]['rows'].length;
				for (let i = 0; i < totalRows; i++) {
					let row = layout[category]['rows'][i];
					let flag = 0;
					for (let j = 0; j < row.seats.length; j++) {
						if (row.seats[j].status === 'selected') {
							row.seats[j].status = 'empty';
							flag = 1;
							break;
						}
					}
					if (flag === 1) break;
				}
			}
			seat.status = 'selected';
		} else if (seat.status === 'selected') {
			seat.status = 'empty';
		}
		this.setState({ layout: layout, selectedCategory: category });
	}

	renderRow(row, category) {
		return (
			<li className="seat-row">
				<span className="row-number">{row.row}</span>
				<div className="seats-cntnr">
					{row.seats.map(seat => (
						<span
							className={`seat-number ${
								seat.status === 'occupied' ? 'occupied' : seat.status === 'selected' ? 'selected' : ''
							}`}
							onClick={() => this.toggleSeat(seat.seatNumber, row.row, category)}
						>
							{seat.seatNumber}
						</span>
					))}
				</div>
			</li>
		);
	}

	render() {
    let categories = Object.keys(this.state.layout);
    let seatsSelected = this.getSelectedSeats();
		return (
			<div className="cntnr">
				<div>
					<h1>Choose number of seats</h1>
					<input
						className="seat-input"
						type="number"
						value={this.state.nSeats}
						onChange={this.setSeats}
						min="1"
						max="10"
						ref={ref => (this.nSeats = ref)}
					/>
				</div>
				<ul className="categories-list">
					{categories.map(category => {
						return (
							<li className="category">
								{this.renderRowHeader(category, this.state.layout[category].price)}
								<ul>{this.state.layout[category].rows.map(row => this.renderRow(row, category))}</ul>
							</li>
						);
					})}
				</ul>
        <div className={`action ${seatsSelected!==parseInt(this.nSeats.value) ? "disabled":""}`}>Proceed</div>
			</div>
		);
	}
}

export default App;
