import React from 'react'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';


export default function InfoBox({title,isRed,cases,total,...props}) {
    return (
        <Card onClick={props.onClick}  className={`infoBox ${isRed?"infoBox-red":"infoBox-green"} `}> 
            <CardContent>
                <Typography color="Textsecondary" className="infoBox_title  ">
                    {title}

                </Typography>

                <h2 className={`infoBox_cases ${!isRed &&"infoBox-cases-green"}`}>{cases}</h2>
                <Typography className="infoBox_total" color="textSecondary">
                    {total} total
                </Typography>
            </CardContent>

        </Card>
    )
}
