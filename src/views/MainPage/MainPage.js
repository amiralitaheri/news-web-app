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
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import NewsBody from "./Sections/NewsBody"

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import classNames from "classnames";


class MainPage extends React.Component {
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
                <NewsBody/>
                <Footer/>
            </div>
        )
    }

}

export default MainPage;