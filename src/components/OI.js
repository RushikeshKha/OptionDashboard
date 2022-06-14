import React from 'react'

import {Line} from 'react-chartjs-2'
function OI({chartdata}) {
  return (
    <Line data={chartdata}/>
  )
}

export default OI