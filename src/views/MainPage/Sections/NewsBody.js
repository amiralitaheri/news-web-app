import React from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

import CircleLoader from "react-spinners/CircleLoader"

import SearchBar from "../../../MyComponents/SearchBar/SearchBar";
import Categories from "../../../MyComponents/Categories/Categories";
import NewsCard from "../../../MyComponents/NewsCard/NewsCard";

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
            case "Search":
                sortedNews = this.state.originalNews;
                break;
        }
        this.setState({
            sortBy: sortBy,
            news: sortedNews
        });
    };

    onQueryChange = (value) => {
        console.log(value);
        this.setState({
            searchText: value,
            news: [],
            originalNews: [],
            hasMore: true
        });
    };

    getNews = (pageNumber) => {
        let tempOriNews = this.state.originalNews;
        let tempNews = this.state.news;
        fetch("http://127.0.0.1:9000/getNews?page=" + pageNumber, {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify({"searchQuery": this.state.searchText, "categories": this.state.selectedCategories}),
        }).then((response) => {
            response.json().then(fetchedNews => {
                let count = 0;
                fetchedNews.map((news) => {
                    tempNews.push(news);
                    tempOriNews.push(news);
                    count++;
                });
                console.log(tempNews);
                if (count === 0) {
                    this.setState({
                        news: tempNews,
                        isLoading: false,
                        hasMore: false
                    })
                } else {
                    this.setState({
                        news: tempNews,
                        isLoading: false
                    });
                }

            });

        });

    };

    onCategoryChange = (selectedCategories) => {
        this.setState(
            {
                selectedCategories: selectedCategories,
                news: [],
                originalNews: [],
                hasMore: true,
                isLoading: true
            }
        )
    };

    constructor() {
        super();
        this.state = {
            selectedCategories: [],
            isLoading: true,
            searchText: "",
            news: [],
            originalNews: [],
            hasMore: true,
            sortBy: "Most Relevant"
        };
        this.newsCards = [];
    }


    render() {
        let items = [];
        this.state.news.map((news, i) => {
            items.push(
                <div key={news["id"]}>
                    <NewsCard news={news}/>
                </div>
            )
        });
        const {classes} = this.props;

        let count = 0;
        this.state.news.forEach(() => {
            count++;
        });
        console.log(count);
        if (false) {
            return (
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <SearchBar onQueryChange={this.onQueryChange}
                                       onSelectSortOption={this.onSelectSortOption} sortBy={this.state.sortBy}/>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <Categories categories={this.state.selectedCategories}
                                        onSelectCategory={this.onCategoryChange}/>
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
                            <Categories categories={this.state.selectedCategories}
                                        onSelectCategory={this.onCategoryChange}/>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <div style={{"height": "550px", "overflowY": "auto"}}>
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={this.getNews.bind(this)}
                                    hasMore={this.state.hasMore}
                                    useWindow={false}
                                    loader={
                                        <div key={0} style={{
                                            display: "flex",
                                            paddingTop: "100px",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <h2 style={{"color": "#808080"}}>loading...</h2>
                                            <div>
                                                <CircleLoader
                                                    size={300}
                                                    color={"#32a8a6"}
                                                    loading={this.state.loading}
                                                />
                                            </div>
                                        </div>
                                    }
                                >
                                    {items}
                                </InfiniteScroll>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            )
        }


    }
}

export default withStyles(styles, {withTheme: true})(NewsBody);