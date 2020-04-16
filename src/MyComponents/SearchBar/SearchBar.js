import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import CustomInput from "../../components/CustomInput/CustomInput";
import DropDown from "../DropDown";
import Button from "../../components/CustomButtons/Button";

const SearchBar = (props) => {
    let v = "";
    const keyPress = (e) => {
        v = e.target.value;
    };
    return (
        <div style={{
            paddingTop: "65px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap"
        }}>
            <div style={{flexGrow: 6}}>
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
            <div style={{flexGrow: 0, padding: "15px"}}>
                <div onClick={() => {
                    props.onQueryChange(v)
                }}>
                    <Button type="button" color="info" round>Search</Button>
                </div>
            </div>
            <div style={{flexGrow: 0, padding: "15px"}}>
                <DropDown onSelectOption={props.onSelectSortOption} sortBy={props.sortBy}/>
            </div>
        </div>

    )

};

export default SearchBar;