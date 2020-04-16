import React from "react";
import CustomDropdown from "../components/CustomDropdown/CustomDropdown";

const DropDown = ({sortBy, onSelectOption}) => {
    return (
        <CustomDropdown
            buttonText={sortBy}
            dropdownList={[
                <p color="default" onClick={() => {
                    onSelectOption("Most Relevant")
                }}>Most Relevant</p>,
                <p color="default" onClick={() => {
                    onSelectOption("Date")
                }}>Sort By Date</p>,
                <p color="default" onClick={() => {
                    onSelectOption("Title")
                }}>Sort By Title</p>,
                <p color="default" onClick={() => {
                    onSelectOption("Likes")
                }}>Sort By Likes</p>,
                <p color="default" onClick={() => {
                    onSelectOption("Views")
                }}>Sort By Views</p>
            ]}
        />

    )
};

export default DropDown;