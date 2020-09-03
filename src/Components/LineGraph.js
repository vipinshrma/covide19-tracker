import React,{useState,useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import numeral from 'numeral';

const options={
    legend:{
        display:false
    },
    elements:{
        point:{
            readius:0
        }
    },
    maintainAspectRatio:false,
    tooltips:{
        mode:"index",
        intersect:false,
        callbacks:{
            label:function (tooltipItem,data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales:{
        xAxes:[
            {
                type:"time",
                time:{
                    format:"MM/DD/YY",
                    tooltip:"ll"
                }
            }
        ],
        yAxes:[
            {
                gridLines:{
                    display:false
                },
                ticks:{
                    callback:function(value,index,values){
                        return numeral(value).format("0a")
                    }
                }
            }
        ]
    },
   

}


export default function LineGraph({casesType}) {
    const [data,setData]=useState({})
    

    const buildChartData=(data)=>{
        const chardData=[];
        let lastDataPoint;
        
        for(let date in data.cases){
            if(lastDataPoint){
                const newDataPoint={
                    x:date,
                    y:data[casesType][date]-lastDataPoint
                } 
                chardData.push(newDataPoint);
            
            }
            lastDataPoint=data[casesType][date];
            
        }
        return chardData;

    }

    useEffect(()=>{
        const fetchData=async()=>{
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=100').then(response=>{
            return response.json();
        }).then(data=>{
             const chartData= buildChartData(data);
             setData(chartData);

        });
        
    }

        fetchData()
    },[casesType])
    return (
        <div className="app-graph">
            {data?.length>0 &&(
                <Line
            
                data={
                {
                    datasets:[
                        {
                            data:data,
                            backgroundColor:"rgba(204,16,52,0.5)",
                            borderColor:"#CC1034",
                        }
                    ]
                }
                }
                options={options}
                />
                
                )}
            
        </div>
    )
}
