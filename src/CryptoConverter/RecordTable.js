import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './main.css'

const RecordTable = () => {
    const [records, setRecords] = useState([])

    const url = 'http://localhost:8080/record'
    const getAllRecords = () => {
        axios.get(url).then((response) =>{
            const allRecords = response.data;
            console.log( "all records",allRecords)
            setRecords(allRecords)
        }).catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        
        getAllRecords()
    },[])


  return (
    <div className="table-container">
        <table>
            <tr className='table-head'>
                    <th>Date &  Time</th>
                    <th>Currency From</th>
                    <th>Amount 1</th>
                    <th>Currency To</th>
                    <th>Amount 2</th>
                    <th>Type</th>
            </tr>
            {
                records?.map(record => (
                    <tr key={record._id}>
                        <td>{record.date}</td>
                        <td>{record.crypto}</td>
                        <td>{record.amount}</td>
                        <td>{record.convertTo}</td>
                        <td>{record.result}</td>
                        <td>{record.type}</td>
                    </tr>
                ))
            }
        </table>
    </div>
  )
}

export default RecordTable