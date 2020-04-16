import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
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

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import {withStyles} from "@material-ui/core";
import SnackbarContent from "../../components/Snackbar/SnackbarContent";
import {Warning} from "@material-ui/icons";


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.usernameInput = React.createRef();
        this.passwordInput = React.createRef();
        this.state = {
            warning: false
        }
    }

    getToken = () => {
        fetch("http://localhost:9000/authenticate", {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify({
                "username": this.usernameInput.current.value,
                "password": this.passwordInput.current.value
            }),
        }).then((response) => {
            response.json().then(fetchedResponse => {
                if (fetchedResponse["result"] === "true") {
                    window.MyToken = fetchedResponse["token"];
                    window.location.href = "/admin-page";
                } else {
                    this.setState({
                        warning: true
                    })
                }
            })
        })
    };

    render() {
        const {classes} = this.props;
        const {...rest} = this.props;
        return (
            <div>
                <Header
                    absolute
                    color="transparent"
                    brand="Simple News Login"
                    rightLinks={<HeaderLinks/>}
                    {...rest}
                />
                <div
                    className={classes.pageHeader}
                    style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "top center"
                    }}
                >
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <Card>
                                    <form className={classes.form}>
                                        <CardHeader color="primary" className={classes.cardHeader}>
                                            <h4>Login</h4>
                                        </CardHeader>
                                        <p className={classes.divider}>It's Not That Secure!!</p>
                                        <CardBody>
                                            <CustomInput
                                                labelText="Email..."
                                                id="email"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "email",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Email className={classes.inputIconsColor}/>
                                                        </InputAdornment>
                                                    ),
                                                    inputRef: this.usernameInput
                                                }}
                                            />
                                            <CustomInput
                                                labelText="Password"
                                                id="pass"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "password",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Icon className={classes.inputIconsColor}>
                                                                lock_outline
                                                            </Icon>
                                                        </InputAdornment>
                                                    ),
                                                    autoComplete: "off",
                                                    inputRef: this.passwordInput
                                                }}
                                            />
                                        </CardBody>

                                        <CardFooter className={classes.cardFooter}>
                                            <div onClick={() => this.getToken()}>
                                                <Button simple color="primary" size="lg">
                                                    Get started
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </form>
                                </Card>
                                <div style={{display: this.state.warning ? "flex" : "none"}}>
                                    <SnackbarContent
                                        message={
                                            <span>
                                         <b>WARNING ALERT:</b> Wrong Password Or Username
                                        </span>
                                        }
                                        color="warning"
                                        icon={Warning}
                                    />
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>

                    <Footer whiteFont/>
                </div>
            </div>
        );
    }


}

export default withStyles(styles, {withTheme: true})(LoginPage);