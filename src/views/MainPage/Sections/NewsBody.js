import React from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

import SearchBar from "../../../MyComponents/SearchBar/SearchBar";
import Categories from "../../../MyComponents/Categories/Categories";
import NewsCard from "../../../MyComponents/NewsCard/NewsCard";
import Scroll from "../../../MyComponents/Scroll";


import styles from "assets/jss/material-kit-react/views/landingPage.js";
import {withStyles} from "@material-ui/core";


class NewsBody extends React.Component {
    onSelectSortOption = (sortBy) => {
        console.log(this.state)
        console.log(sortBy)
        this.setState({
            sortBy: sortBy
        })
    }

    constructor() {
        super();
        this.state = {
            selectedCategory: "",
            searchText: "",
            news: [
                {
                    "category": 'WELLNESS',
                    "headline": "Roadmap for the Work Week",
                    "authors": "Rupa Mehta, Contributor\\nFounder of Nalini Method, NaliniKIDS and author of \\The Nalini...",
                    "link": "https://www.huffingtonpost.com/entry/success-and-motivation_us_5b9d8bd1e4b03a1dcc8960d3",
                    "short_description": "Any good roadmap has structure and suggestions, but that doesn't mean you can't choose to detour. What's important is to accept each day for what it is and to be present in it. Choose to be the best you can be in the moment.",
                    "date": "2013-09-30",
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
                    <GridItem xs={12} sm={12} md={12}>
                        <SearchBar onSelectSortOption={this.onSelectSortOption} sortBy={this.state.sortBy}/>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Categories/>
                    </GridItem>
                    <Scroll>
                        <GridItem xs={12} sm={12} md={12}>
                            <NewsCard news={this.state.news[0]}/>
                            <NewsCard news={this.state.news[0]}/>
                            <NewsCard news={this.state.news[0]}/>
                            <NewsCard news={this.state.news[0]}/>
                            <NewsCard news={this.state.news[0]}/>
                            <NewsCard news={this.state.news[0]}/>
                        </GridItem>
                    </Scroll>
                </GridContainer>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(NewsBody);