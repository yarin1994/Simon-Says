import React from 'react';

const TimeOut = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export default TimeOut;