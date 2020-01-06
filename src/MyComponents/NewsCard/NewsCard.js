import React from "react";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import Badge from "../../components/Badge/Badge";
import Favorite from '@material-ui/icons/Favorite';
import Button from '../../components/CustomButtons/Button';

const NewsCard = ({news}) => {
    return (
        <div>
            <Card>
                <CardBody>
                    <a href={news["link"]}><h3>{news["headline"]}</h3></a>
                    <p>{news["short_description"]}</p>
                    <p><small>authors: {news["authors"]}</small></p>
                    <Badge>{news["category"]}</Badge>

                    <Button round color="rose" size={"sm"}><Favorite style={{color: "#FFFFFF"}}/>{news["likeNumber"]}</Button>
                </CardBody>
            </Card>
        </div>
    )
};

export default NewsCard;