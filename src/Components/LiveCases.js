
import React from 'react'

import Card from '@material-ui/core/Card';
import Table from '../Components/Table';
import LineGraph from '../Components/LineGraph';

export default function LiveCases(props) {
    const tableData=props.data;
    
    return (
        <Card  className="cases">
            
            <h1>Live cases by country</h1>
            <Table countries={tableData}/>
            <h2 className="app-graph-title"> worldwide new cases</h2>
            <LineGraph casesType={props.casesType}/>
            

        </Card>
    )
}
