import React from 'react';
import './ResultsTable.module.css';

function ResultsTable(props) {
    // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // let tableData = props.data;
    // let firstPaymentDate = Date.now();
    // let thisDate = new Date(firstPaymentDate)
    // let firstMonth = thisDate.getMonth();
    // let firstYear = thisDate.getYear();

    // console.log(firstYear, firstMonth);
    // let dateForTable = new Date(firstYear, firstMonth)

    // for (let i = 0; i < tableData.length; i++) {
    //     let month = months[dateForTable.getMonth()];
    //     let year = dateForTable.getYear();
    //     tableData.date = `${month} ${year}`;
    //     dateForTable += 1; 
    // }
    return (
        <div>
            <table className='resultTable'>
                <tr>
                    <th>Month</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Remaining balance</th>
                </tr>
                {props.data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.date}</td>
                            <td>R{val.principal}</td>
                            <td>R{val.interest}</td>
                            <td>R{val.remainingBalance}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default ResultsTable