import React from 'react';
import {Line} from 'react-chartjs-2';
import {Container} from '@material-ui/core'
class Graph extends React.Component{
state = {labels: this.props.t,
    datasets: [
        {
            label: this.props.x,
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: this.props.x
        }
    ]}
    handleChange = (e) => {
        if (e.target.value == 'x'){
            const x = {labels: this.props.t,
                datasets: [
                    {
                        label: this.props.x,
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: this.props.x
                    }
                ]}
            this.setState(x);
        }
        else if (e.target.value == 'v'){
            const v = {
                labels: this.props.t,
            datasets: [
                {
                    label: this.props.v,
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: this.props.v
                }
            ]
            }
            this.setState(v);
        }
        else if (e.target.value == 'a'){
            const a = {
                labels: this.props.t,
                datasets: [
                    {
                        label: this.props.a,
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: this.props.a
                    }
                ]
                }
            this.setState(a);
        }
    }
    render(){
        return (
            <Container maxWidth='lg'>
                    <select onChange={this.handleChange}>
                        <option value="x">Displacement</option>
                        <option value="v">Velocity</option>
                        <option value="a">Acceleration</option>
                    </select>
                    <Line
                        data={this.state}
                        options={{
                            title:{
                            display:true,
                            text:'Velocity with time',
                            fontSize:20
                            },
                            legend:{
                            display:false,
                            position:'right'
                            }
                        }}
                    />
                     </Container>
            
        )   
    }
}
export default Graph;
