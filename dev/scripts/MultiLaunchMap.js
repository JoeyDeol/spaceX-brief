import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router-dom';

class MultiLaunchMap extends React.Component {
    constructor() {
        super();
        this.state = {
            mapInfo: [],
            startDate: '',
            endDate: '',
            userSelectMap: [],
            // Make sure to come back and set initial state for Start and End date to a number!
        }
        this.getStartDate = this.getStartDate.bind(this);
        this.getEndDate = this.getEndDate.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`https://api.spacexdata.com/v2/launches/`)
        .then(({data}) => {
            console.log(data);
            const allRocketData = data;
            this.setState({
                mapInfo: allRocketData,
            })
        }) 
    }

    formSubmit(e) {
        e.preventDefault();
        console.log('hello');
        this.initMap();
        this.state.startDate > this.state.endDate ? alert('Incorrect submission of date. Please check your selection again. ') : null;   
        const slicedMapInfo = this.state.mapInfo.slice(this.state.startDate,this.state.endDate);
        this.setState({
            userSelectMap: slicedMapInfo
        })
    }

    getStartDate(e) {
        this.setState({
            startDate: e.target.value
        })
    }

    getEndDate(e) {
        this.setState({
            endDate: e.target.value
        })
    }

    render() {
        console.log(this.state.userSelectMap);
        return (
            <div>
                <Link to="/home">Home</Link>
                <h2>MultiLaunchMap</h2>
                <form action="" onSubmit={this.formSubmit}>
                    <label htmlFor="startDate">Start Date:</label>
                    <select name="startDate" id="" onChange={this.getStartDate} value={this.state.startDate}>
                        {this.state.mapInfo.map((item) => {
                            return (
                                <option value={item.flight_number} key={item.flight_number}>Flight: {item.flight_number}, {moment(`${item.launch_date_utc}`).format('LL')}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="endDate">End Date:</label>
                    <select name="endDate" id="" onChange={this.getEndDate} value={this.state.endDate}>
                        {this.state.mapInfo.map((item) => {
                            return (
                                <option value={item.flight_number} key={item.flight_number}>Flight: {item.flight_number}, {moment(`${item.launch_date_utc}`).format('LL')}</option>
                            )
                        })}
                    </select>
                    <input type="submit" value="Submit" />
                </form>          


            </div>
        )
    }
}

export default MultiLaunchMap;