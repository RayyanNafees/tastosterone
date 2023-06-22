import React from 'react'
import { Chart } from 'react-google-charts'

const DonutChart = () => {
  const data = [
    ['Lessons Completed', 'Ongoing Lessons'],
    ['Completed Lessons', 62],
    ['Ongoing Lessons', 38],
  ]

  const options = {
    title: 'Lessons',
    pieHole: 0.4,
    is3D: false,
  }

  return (
    <Chart
      chartType='PieChart'
      width='100%'
      height='100%'
      data={data}
      options={options}
    />
  )
}

export default DonutChart
