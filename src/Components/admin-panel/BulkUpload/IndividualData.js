import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return (
        <>
            <td>{individualExcelData.company}</td>
            <td>{individualExcelData.ctc}</td>
            <td>{individualExcelData.exp}</td>
            <td>{individualExcelData.location}</td>
            <td>{individualExcelData.title}</td>
            <td>{individualExcelData.desc}</td>
        
        </>
    )
}