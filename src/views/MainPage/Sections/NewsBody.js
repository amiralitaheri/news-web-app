import React from "react";

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
        this.setState({
            sortBy: sortBy,
            news: [],
            originalNews: [],
            hasMore: true,
            pageStart: -1,
            scrollerKey: this.state.scrollerKey + 1
        });
    };

    onQueryChange = (value) => {
        this.setState({
            searchText: value,
            news: [],
            originalNews: [],
            hasMore: true,
            pageStart: -1,
            scrollerKey: this.state.scrollerKey + 1
        });
    };

    getNews = (pageNumber) => {
        console.log("page", pageNumber);
        console.log("text", this.state.searchText);
        console.log("categories", this.state.selectedCategories);
        let tempOriNews = this.state.originalNews;
        let tempNews = this.state.news;
        fetch("http://127.0.0.1:9000/getNews?page=" + pageNumber, {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify({
                "searchQuery": this.state.searchText,
                "categories": this.state.selectedCategories,
                "sortBy": this.state.sortBy
            }),
        }).then((response) => {
            response.json().then(fetchedNews => {
                let count = 0;
                fetchedNews.map((news) => {
                    tempNews.push(news);
                    tempOriNews.push(news);
                    count++;
                });
                console.log(tempNews);
                if (count < 50) {
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
                isLoading: true,
                scrollerKey: this.state.scrollerKey + 1
            }
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedCategories: [],
            isLoading: true,
            searchText: "",
            news: [],
            originalNews: [],
            hasMore: true,
            sortBy: "Most Relevant",
            scrollerKey: 0
        };
    }


    render() {
        let items = [];
        this.state.news.map((news) => {
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
                        <div style={{"height": "550px", "overflowY": "auto"}} key={this.state.scrollerKey}>
                            <InfiniteScroll
                                pageStart={-1}
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

export default withStyles(styles, {withTheme: true})(NewsBody);