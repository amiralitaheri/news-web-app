import React from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

import SearchBar from "../../../MyComponents/SearchBar/SearchBar";
import Categories from "../../../MyComponents/Categories/Categories";
import NewsCard from "../../../MyComponents/NewsCard/NewsCard";


import styles from "assets/jss/material-kit-react/views/landingPage.js";
import {withStyles} from "@material-ui/core";


class NewsBody extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedCategory: "",
            searchText: "",
            news: [
                {
                    "category": 'WELLNESS',
                    "headline": "this is the news head line!!",
                    "authors": "amirali",
                    "link": "https://www.google.com",
                    "short_description": "Lorm Esdsadasfsafsafaesfjsavjdiosadvlasjd;lsavdvdwvasdvsad",
                    "date": "2019",
                    "likeNumber": 21,
                    "views": 1000
                }
            ],
            sortBy: "time"
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <SearchBar/>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Categories/>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <NewsCard news={this.state.news[0]}/>
                        <NewsCard news={this.state.news[0]}/>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(NewsBody);