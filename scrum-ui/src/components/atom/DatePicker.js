import React, { useState } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

const DatePicker = () => {
    const [currentDate, setNewDate] = useState(null);
    const onDateChange = (event, data) => setNewDate(data.value);
    return <SemanticDatepicker onChange={onDateChange}/>;
}


export default DatePicker;