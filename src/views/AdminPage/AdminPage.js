import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";

import AdminNewsBody from "./Sections/AdminNewsBody";


class AdminPage extends React.Component {
    constructor() {
        super();
    }
    render() {

        return (
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                <Header
                    brand={"Simple News"}
                    fixed={true}
                    rightLinks={<HeaderLinks/>}
                    absolute={true}
                />
                <AdminNewsBody/>
                <Footer/>
            </div>
        )
    }

}

export default AdminPage;