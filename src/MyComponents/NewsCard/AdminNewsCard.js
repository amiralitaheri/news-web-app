import React from "react";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import Badge from "../../components/Badge/Badge";
import Favorite from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '../../components/CustomButtons/Button';
import ViewNumber from '../../MyComponents/ViewNumber'

const AdminNewsCard = ({news, onDelete}) => {
    return (
        <div>
            <Card>
                <CardBody>
                    <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                        <div onClick={() => onDelete(news["id"])}>
                            <Button color={"twitter"} simple={true} style={{padding: "5px"}}>
                                <EditIcon style={{margin: "0"}}/>
                            </Button>
                        </div>
                        <div onClick={() => onDelete(news["id"])}>
                            <Button color={"google"} simple={true} style={{padding: "5px", margin: "0"}}>
                                <DeleteForeverIcon style={{margin: "0"}}/>
                            </Button>
                        </div>
                    </div>
                    <a href={news["link"]} target={"_blank"}><h3>{news["headline"]}</h3></a>
                    <p>{news["short_description"]}</p>
                    <p><small>authors: {news["authors"]}</small></p>
                    <div style={{height: "fit-content", margin: "7px"}}><Badge>{news["category"]}</Badge></div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div style={{
                                height: "fit-content",
                                marginRight: "7px",
                                padding: "4px",
                                border: "2px solid #808080",
                                borderRadius: "25px",

                            }}><ViewNumber number={news["views"]}/></div>
                            <Button round color="rose" size={"sm"} style={{height: "fit-content"}}>
                                <Favorite style={{color: "#FFFFFF"}}/>{news["likes"]}
                            </Button>

                        </div>
                        <div>
                            <p style={{}}>{news["date"]}</p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
};

export default AdminNewsCard;