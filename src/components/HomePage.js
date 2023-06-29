import React, { useState, useEffect } from 'react'
import ResultsTable from './ResultsTable';
import styles from './HomePage.module.css'

function toCurrency(num) {
    num = Math.round(num * 100) * 0.01;
    var currstring = num.toString();
    if (currstring.match(/\./)) {
        var curr = currstring.split('.');
    } else {
        var curr = [currstring, "00"];
    }
    curr[1] += "00";
    curr[2] = "";
    var returnval = "";
    var length = curr[0].length;
    
    // add 0 to decimal if necessary
    for (var i = 0; i < 2; i++) 
        curr[2] += curr[1].substr(i, 1);
 
    // insert commas for readability
    for (i = length; (i - 3) > 0; i = i - 3) {
        returnval = "," + curr[0].substr(i - 3, 3) + returnval;
    }
    returnval = curr[0].substr(0, i) + returnval + "." + curr[2];
    return(returnval);
}

function HomePage() {
    /* todo: setInputs using useReducer instead of useState maybe ??
     * useReducer is preferred over useState when it comes to object or array type state items
     * refer to https://youtu.be/3VClygDRSsU?list=PLC3y8-rFHvwisvxhZ135pogtX7_Oe3Q3A&t=56
     * */
    const [inputs, setInputs] = useState({});
    const [payment, setPayment] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [allTimeInterest, setAllTimeInterest] = useState(0);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const deposit = inputs.deposit ? parseFloat(inputs.deposit) : 0
        const principal = parseFloat(inputs.principal) - deposit;
        const interest = parseFloat(inputs.interest) / 100 / 12;
        const x = Math.pow(1 + interest, parseFloat(inputs.term));
        const payment = (principal * x * interest) / (x - 1);
        setPayment(payment);

        // for table calculations
        let initialInterestPayment = (principal * parseFloat(inputs.interest)/100) / 12;
        let initialPrincipalPayment = payment - initialInterestPayment;
        console.log(initialInterestPayment, principal, interest, initialPrincipalPayment);
        let initialPrincipal = parseFloat(inputs.principal);
        let loopTable = []
        let interestCounter = 0;

        for(let i = 0; i < inputs.term; i++) {
            loopTable.push({
                date: i + 1,
                principal: toCurrency(initialPrincipalPayment),
                interest: toCurrency(initialInterestPayment),
                remainingBalance: toCurrency(initialPrincipal)
            });
    
            interestCounter += initialInterestPayment;
            initialPrincipal -= initialPrincipalPayment;
            initialInterestPayment = (initialPrincipal * parseFloat(inputs.interest)/100) / 12;
            initialPrincipalPayment = payment - initialInterestPayment;
        }
        
        setTableData(loopTable);
        setAllTimeInterest(interestCounter);
    }

    useEffect(() => {
    }, [tableData])
    return (
        <div className={styles.BondPage}>
            <div>
                <h2>Bond Calculator</h2>
                <div className={styles.DetailsForm}>
                    <form onSubmit={handleSubmit}>
                        <label>Home price
                            <input
                                type='text'
                                name='principal'
                                value={inputs.principal || 0}
                                onChange={handleChange}
                            />
                        </label>
                        <label>Deposit
                            <input
                                type='text'
                                name='deposit'
                                value={inputs.deposit || 0}
                                onChange={handleChange}
                            />
                        </label>
                        <label>Loan term(in months)
                            <input
                                type='text'
                                name='term'
                                value={inputs.term || 0}
                                onChange={handleChange}
                            />
                        </label>
                        <label>Interest
                            <input
                                type='text'
                                name='interest'
                                value={inputs.interest || 0}
                                onChange={handleChange}
                            />
                        </label>
                        <input type='submit'/>
                    </form>
                </div>
            </div>
            <div className={styles.ResultsSection}>
                <h2>Your monthly payment is ZAR {toCurrency(payment)}</h2>
                <h2>Total interest paid is ZAR {toCurrency(allTimeInterest)}</h2>
                <ResultsTable data={tableData} />
            </div>
        </div>
    )
}

export default HomePage