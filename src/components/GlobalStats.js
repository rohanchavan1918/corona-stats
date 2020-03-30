import React, { Component } from 'react'
import axios from 'axios'
import {Button, Row, Col,Jumbotron, Container, Form} from 'react-bootstrap';
import { Card, CardTitle, CardText, Input} from 'reactstrap';

import PieChart from 'react-minimal-pie-chart';

export class GlobalStats extends Component {
    constructor(props){
        super(props)
        this.state = {
            country : "World",
            total_deaths : 0,
            total_cases : 0,
            total_recovered : 0  
        }
    }

    handleCountryChange = (event) =>{
        this.setState({
            country : event.target.value
        })
    }

    handleCountrySubmit = (event) => {
        console.log(this.state.country);
        var url = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country="+this.state.country
        console.log(url);
        var headers = {
            "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
            "x-rapidapi-key": "31e5a0778bmsha5f2cddc4b6611cp1dddffjsn0177277811f1"
        }
        axios.get(url,{headers : headers})
            .then(response => {
                // console.log("SEARCH RESPONSE")
                var covid19data  = response.data.data.covid19Stats
                console.log(covid19data)
                var no_of_objects = Object.keys(covid19data).length
                var total_deaths = 0
                var total_cases = 0
                var total_recovered = 0
                console.log("STATE UPTIL HERE")
                console.log(this.state)
                for(var i=0;i <= no_of_objects-1; i++){
                    total_deaths = total_deaths + covid19data[i].deaths
                    console.log(total_deaths)
                    total_cases = total_cases + covid19data[i].confirmed
                    total_recovered = total_recovered + covid19data[i].recovered  
                    console.log(total_deaths,total_cases,total_recovered)                                  
                }
                console.log("DAta for "+this.state.country+" recov"+total_recovered+"death"+total_deaths)
                this.setState({
                    total_cases : total_cases,
                    total_recovered : total_recovered,
                    total_deaths : total_deaths
                })
                console.log("NEW STATE")
                console.log(this.state.total_deaths, this.state.total_recovered, this.state.total_cases)


            })
            .catch(error => {
                console.log(error)
            })


    }

    componentDidMount(){
        var url = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats",
        headers = {
            "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
            "x-rapidapi-key": "31e5a0778bmsha5f2cddc4b6611cp1dddffjsn0177277811f1"
        }
        axios.get(url,{headers : headers})
            .then(response => {
                // console.log(response.data.data.covid19Stats[0])
                var covid19data  = response.data.data.covid19Stats
                var no_of_objects = Object.keys(covid19data).length
                var total_deaths = 0
                var total_cases = 0
                var total_recovered = 0
                // console.log(covid19data[0].confirmed)
                for(var i=0;i<=no_of_objects-1;i++){
                   total_deaths = total_deaths + covid19data[i].deaths
                   total_cases = total_cases + covid19data[i].confirmed
                   total_recovered = total_recovered + covid19data[i].recovered 
                   
                }
                // console.log("Total Deaths :- ",total_deaths)
                this.setState({
                    total_cases : total_cases,
                    total_recovered : total_recovered,
                    total_deaths : total_deaths
                })
                
                console.log('total_deaths :-'+total_deaths+' total_cases :- '+total_cases+' total recovered :-'+total_recovered )
                console.log("[+] STATE DATA")
                console.log(this.state.total_deaths, this.state.total_cases, this.state.total_recovered)
                localStorage.setItem('total_deaths',total_deaths);
                localStorage.setItem('total_recovered',total_recovered);
                localStorage.setItem('total_cases',total_cases)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <Jumbotron>
                <h1>CORONA VIRUS GLOBAL STATISTICS</h1>
                {/* INPUT  */}
                <Container className="themed-container" fluid="sm">
                    <Form onSubmit={this.handleCountrySubmit}>
                    <Input
                     bsize="lg" 
                     placeholder="Enter Country Name" 
                     style={{marginBottom:'5px'}} 
                     value={this.state.country}
                     onChange={this.handleCountryChange}
                     />
                     <Button type="submit" size="lg" style={{paddingTop:'5px'}}>Search</Button>
                    <hr/>
                    </Form>
                </Container>
                <br/>
                {/* Pie CHart */}
                
                    <PieChart
                    animate={true}
                    animationDuration={500}
                    animationEasing="ease-out"
                    cx={50}
                    cy={50}
                    data={[
                        {
                        color: '#0384fc',
                        title: 'Total Cases',
                        value: this.state.total_cases
                        },
                        {
                        color: '#05fc05',
                        title: 'Total Recovered',
                        value: this.state.total_recovered
                        },
                        {
                        color: '#ff0000',
                        title: 'Total Deaths',
                        value: this.state.total_deaths
                        }
                    ]}
                    label={true}
                    labelPosition={112}
                    labelStyle={{
                        fontFamily: 'montserrat',
                        fontSize: '10px',
                        fontcolor:'black'
                    }
                    }
                    lengthAngle={360}
                    lineWidth={100}
                    onClick={undefined}
                    onMouseOut={undefined}
                    onMouseOver={undefined}
                    paddingAngle={0}
                    radius={50}
                    rounded={false}
                    startAngle={0}
                    style={{
                        height: '200px'
                    }}
                    viewBoxSize={[
                        100,
                        100
                    ]}
                    />
                    <hr/>
                    <h3>Showing Data for <b style={{color:"#FF0000"}}>{ this.state.country }</b></h3>
                <Row>
                    <Col xs="6" sm="4">
                    <Card body>
                        <CardTitle>Total<br/>Cases</CardTitle><hr/>
                        <CardText> Confirmed Corona Patients.</CardText>
                <Button style={{backgroundColor: '#0384fc' }}>{this.state.total_cases}</Button>
                    </Card>
                    </Col>
                    <Col xs="6" sm="4" >
                    <Card body>
                        <CardTitle>Total<br/>Recovered</CardTitle>
                        <hr/>
                        <CardText> Recovered Corona Patients .</CardText>
                        
                        <Button style={{backgroundColor: '#05fc05'}}>{this.state.total_recovered}</Button>
                    </Card>
                    </Col>
                    <Col sm="4">
                    <Card body>
                        <CardTitle>Total<br/>Deaths</CardTitle><hr/>
                        <CardText> Deaths because of Corona</CardText>
                        <Button style={{backgroundColor: '#ff0000'}}>{this.state.total_deaths}</Button>
                    </Card>
                    </Col>
                </Row>
                </Jumbotron>
            </div>
        )
    }
}

export default GlobalStats
