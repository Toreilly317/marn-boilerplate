import React, { useState } from 'react';

const DatePicker = ({ onchange }) => {
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setendDate] = useState(Date.now());

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '5px' }}>
        <label htmlFor="start-date">Start: </label>
        <input
          id="start-date"
          type="date"
          max={Date.now()}
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="end-date">End: </label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={e => setendDate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DatePicker;
