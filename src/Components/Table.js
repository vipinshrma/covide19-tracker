import React from 'react'
import numeral from 'numeral'

export default function Table({countries}) {

    return (
        <div className="table">
            {countries.map(({country,cases})=>{
                return(
               <tr>
                <td>{country}</td>
                <td>
                    <strong>
                    { numeral( cases).format()}
                    </strong>
                    </td>
             </tr> 
                )
            })}
            
                
        
            
        </div>
    )
}
