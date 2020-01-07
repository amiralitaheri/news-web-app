import React from "react";
import VisibilityIcon from '@material-ui/icons/Visibility';

const ViewNumber = (props) => {
    return (
        <div>
        <VisibilityIcon style={{color: "grey", fontSize: 10}}/>
        {props.number}
    </div>
    )
};

export default ViewNumber;