import React from "react";
import Badge from '../../components/Badge/Badge.js';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';


class Categories extends React.Component {
    cat = ["RELIGION", "QUEER VOICES", "CRIME", "FIFTY", "DIVORCE", "WORLDPOST", "HOME & LIVING", "CULTURE & ARTS", "FOOD & DRINK", "TASTE", "GOOD NEWS", "WOMEN", "PARENTS", "WORLD NEWS", "LATINO VOICES", "ENTERTAINMENT", "WEIRD NEWS", "MEDIA", "EDUCATION", "WEDDINGS", "TECH", "TRAVEL", "IMPACT", "ENVIRONMENT", "BLACK VOICES", "SPORTS", "HEALTHY LIVING", "MONEY", "POLITICS", "COMEDY", "ARTS & CULTURE", "SCIENCE", "BUSINESS", "STYLE", "ARTS", "COLLEGE", "WELLNESS", "STYLE & BEAUTY", "PARENTING", "GREEN", "THE WORLDPOST"];

    constructor(props) {
        super(props);
        const isSelectedTemp = [];
        this.cat.map((c) => {
            isSelectedTemp[c] = false;
        });
        let count = 0;
        console.log(this.props.categories);
        console.log(this.props);
        this.props.categories.map((c) => {
            isSelectedTemp[c] = true;
            count++;
        });
        this.state = {
            isSelected: isSelectedTemp,
            selectedCount: count
        }
    }

    onClickBadge = (key) => {
        let isSelectedTemp = this.state.isSelected;
        isSelectedTemp[key] = !isSelectedTemp[key];
        let categories = [];
        this.cat.map(
            (c) => {
                if (isSelectedTemp[c]) {
                    categories.push(c);
                }
            }
        );
        this.props.onSelectCategory(categories);
        this.setState({
            isSelected: isSelectedTemp
        })

    };

    render() {
        return (
            <SimpleBar autoHide={false}>
                <div style={{"display": "flex", "padding": "20px"}}>
                    {
                        this.cat.map(
                            (name, i) => {
                                let color;
                                if (this.state.isSelected[name]) {
                                    color = "info"
                                } else {
                                    color = "gray"
                                }
                                return (
                                    <div key={i} onClick={() => this.onClickBadge(name)} style={{cursor: "pointer"}}>
                                        <Badge color={color}>{name}</Badge>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </SimpleBar>

        )
    }
}

export default Categories;