import React from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

import CircleLoader from "react-spinners/CircleLoader"

import SearchBar from "../../../MyComponents/SearchBar/SearchBar";
import Categories from "../../../MyComponents/Categories/Categories";
import NewsCard from "../../../MyComponents/NewsCard/NewsCard";
import Scroll from "../../../MyComponents/Scroll";

import InfiniteScroll from 'react-infinite-scroller';


import styles from "assets/jss/material-kit-react/views/landingPage.js";
import {withStyles} from "@material-ui/core";


class NewsBody extends React.Component {

    onSelectSortOption = (sortBy) => {
        const sortHeadline = (a, b) => {
            if (a['headline'] > b['headline']) {
                return 1;
            } else if (a['headline'] < b['headline']) {
                return -1;
            } else {
                return 0;
            }
        };
        const sortLikeNumber = (a, b) => {
            if (a['likeNumber'] > b['likeNumber']) {
                return -1;
            } else if (a['likeNumber'] < b['likeNumber']) {
                return 1;
            } else {
                return 0;
            }
        };
        const sortViews = (a, b) => {
            if (a['views'] > b['views']) {
                return -1;
            } else if (a['views'] < b['views']) {
                return 1;
            } else {
                return 0;
            }
        };
        const sortDate = (a, b) => {
            if (a['date'] > b['date']) {
                return 1;
            } else if (a['date'] < b['date']) {
                return -1;
            } else {
                return 0;
            }
        };
        let sortedNews = [];
        switch (sortBy) {
            case "Date":
                sortedNews = this.state.news.sort(sortDate);
                break;
            case "Title":
                sortedNews = this.state.news.sort(sortHeadline);
                break;
            case "Likes":
                sortedNews = this.state.news.sort(sortLikeNumber);
                break;
            case "Views":
                sortedNews = this.state.news.sort(sortViews);
                break;
        }
        this.setState({
            sortBy: sortBy,
            news: sortedNews
        });
        console.log(sortBy);
        console.log(sortedNews)
    };

    onQueryChange = (value) => {
        this.setState({
            searchText: value,
            news: []
        });
        this.getNews(0);
    };

    getNews = (pageNumber) => {
        let tempNews = this.state.news;
        fetch("http://127.0.0.1:9000/getNews?page=" + pageNumber, {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify({"searchQuery": this.state.searchText, "categories": this.state.selectedCategories}),
        }).then((response) => {
            response.json().then(fetchedNews => {
                fetchedNews.map((news) => {
                    tempNews.push(<NewsCard key={news["id"]} news={news}/>);
                });
                console.log(tempNews);
                console.log(this);
                this.setState({
                    news: tempNews,
                    isLoading: false
                });
            });

        });

    };

    constructor() {
        super();
        this.state = {
            selectedCategories: [],
            isLoading: true,
            searchText: "",
            news: [],
            // news: [
            //     {
            //         "id": 1
            //         "category": 'WELLNESS',
            //         "headline": "Roadmap for the Work Week",
            //         "authors": "Rupa Mehta, Contributor\\nFounder of Nalini Method, NaliniKIDS and author of \\The Nalini...",
            //         "link": "https://www.huffingtonpost.com/entry/success-and-motivation_us_5b9d8bd1e4b03a1dcc8960d3",
            //         "short_description": "Any good roadmap has structure and suggestions, but that doesn't mean you can't choose to detour. What's important is to accept each day for what it is and to be present in it. Choose to be the best you can be in the moment.",
            //         "date": "2013-09-30",
            //         "likeNumber": 21,
            //         "views": 1000
            //     },
            //     {
            //         "id": 2
            //         "category": 'Sport',
            //         "headline": "Aootball is good!!",
            //         "authors": "Rupa Mehta, Contributor\\nFounder of Nalini Method, NaliniKIDS and author of \\The Nalini...",
            //         "link": "https://www.huffingtonpost.com/entry/success-and-motivation_us_5b9d8bd1e4b03a1dcc8960d3",
            //         "short_description": "Any good roadmap has structure and suggestions, but that doesn't mean you can't choose to detour. What's important is to accept each day for what it is and to be present in it. Choose to be the best you can be in the moment.",
            //         "date": "2013-06-30",
            //         "likeNumber": 52,
            //         "views": 900
            //     }
            // ],
            sortBy: "Date"
        };
        this.newsCards = [];
        this.getNews(0);
    }


    render() {
        const {classes} = this.props;
        if (this.state.isLoading) {
            return (
                <GridItem xs={12} sm={12} md={12}>
                    <div style={{
                        display: "flex",
                        paddingTop: "100px",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <h2>loading...</h2>
                        <div>
                            <CircleLoader
                                size={300}
                                color={"#123abc"}
                                loading={this.state.loading}
                            />
                        </div>
                    </div>
                </GridItem>
            )
        } else {
            let count = 0;
            this.state.news.forEach(() => {
                count++;
            });
            console.log(count);
            if (count === 0) {
                return (
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <SearchBar onQueryChange={this.onQueryChange}
                                           onSelectSortOption={this.onSelectSortOption} sortBy={this.state.sortBy}/>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <Categories/>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <h1>No News Found!!!</h1>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                )
            } else {
                return (
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <SearchBar onQueryChange={this.onQueryChange}
                                           onSelectSortOption={this.onSelectSortOption} sortBy={this.state.sortBy}/>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <Categories/>
                            </GridItem>
                            <InfiniteScroll
                                pageStart={1}
                                loadMore={this.getNews}
                                hasMore={true}
                                loader={<div className="loader" key={0}>Loading ...</div>}
                            >
                                <GridItem xs={12} sm={12} md={12}>
                                    {this.newsCards}
                                </GridItem>
                            </InfiniteScroll>
                            {/*<Scroll>*/}
                            {/*    <GridItem xs={12} sm={12} md={12}>*/}
                            {/*        {this.state.news.map((n, i) => {*/}
                            {/*            return <NewsCard key={i} news={n}/>*/}
                            {/*        })}*/}
                            {/*    </GridItem>*/}
                            {/*</Scroll>*/}
                        </GridContainer>
                    </div>
                )
            }
        }

    }
}

export default withStyles(styles, {withTheme: true})(NewsBody);