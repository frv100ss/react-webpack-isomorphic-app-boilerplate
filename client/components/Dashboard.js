import React from "react";
import {Link} from "react-router-dom";
import {Card, CardText, CardTitle} from "material-ui/Card";
import Paper from 'material-ui/Paper';
import ThumbnailArticles from "./../components/ThumbnailArticles/ThumbnailArticles"

const style = {
    height: 200,
    width: 275,
    margin: 7,
    marginBottom:20,
    textAlign: 'left',
};

const Dashboard = ({   props,
                       secretData,
                       userInformation
                   }) => (

                       <div>
                           <Card className="container">
                               {userInformation &&
                               <CardText style={{fontSize: '20px', color: 'green'}}>Bienvenue {userInformation} </CardText>}
                               <CardTitle
                                   subtitle="Vous ne devriez avoir accès à cette page qu'àpres vous être authentifié"
                               />
                               {secretData && <CardText style={{fontSize: '16px', color: 'green'}}>{secretData}</CardText>}
                           </Card>
                           <Card className="container">
                               <div className="button-line">
                                   <Paper style={style} zDepth={3}>
                                   <Link to="/createArticle">Créer un nouvel article</Link>
                                   </Paper>
                                   <ThumbnailArticles {...props}/>
                               </div>
                           </Card>
                       </div>

);


export default Dashboard;