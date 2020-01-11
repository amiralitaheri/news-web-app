import React from "react";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import Badge from "../../components/Badge/Badge";
import Favorite from '@material-ui/icons/Favorite';
import Button from '../../components/CustomButtons/Button';
import ViewNumber from '../../MyComponents/ViewNumber'

const NewsCard = ({news}) => {
    return (
        <div>
            <Card>
                <CardBody>
                    <a href={news["link"]}><h3>{news["headline"]}</h3></a>
                    <p>{news["short_description"]}</p>
                    <p><small>authors: {news["authors"]}</small></p>
                    <div style={{height: "fit-content", margin: "7px"}}><Badge>{news["category"]}</Badge></div>
                    <div style={{display: "flex"}}>


                        <div style={{
                            height: "fit-content",
                            margin: "7px",
                            paddingRight: "4px",
                            border: "2px solid #808080",
                            borderRadius: "25px",
                            padding: "4px"
                        }}><ViewNumber number={news["views"]}/></div>
                        <Button round color="rose" size={"sm"}><Favorite
                            style={{color: "#FFFFFF"}}/>{news["likes"]}</Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
};

export default NewsCard;