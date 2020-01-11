import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import CustomInput from "../../components/CustomInput/CustomInput";
import DropDown from "../DropDown";

const SearchBar = (props) => {
    const keyPress = (e) => {
        const value = e.target.value;
        if (value.charAt(value.length - 1) === ' ') {
            props.onQueryChange(value);
        }
    };
    return (
        <div style={{paddingTop: "65px", display: "flex" , alignItems: "center", justifyContent: "center"}}>
            <div style={{flexGrow: 4}}>
                <CustomInput
                    labelText="Search"
                    id="material"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                        onChange: (e) => keyPress(e)
                    }}
                />
            </div>
            <div style={{flexGrow: 1, padding: "15px"}}>
                <DropDown onSelectOption={props.onSelectSortOption} sortBy={props.sortBy}/>
            </div>
        </div>

    )

};

export default SearchBar;