import React, {Component} from 'react';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionDescription from 'material-ui/svg-icons/action/description';

import IconButton from 'material-ui/IconButton';
import axios from 'axios';
import Auth from '../../modules/Auth';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const style = {
    height: 200,
    width: 275,
    margin: 7,
    textAlign: 'left',
};

class ThumbnailArticles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: "",
            alertOpen: false,
            articles: [],
        };
    }

    handleClose(){
        this.setState({alertOpen: false});
    };

    handleOpen(key){
        this.setState({
            alertOpen: true,
            key: key
        });
    };

    handleRequestDelete(key) {
        axios.defaults.headers.common['Authorization'] = `bearer ${Auth.getToken()}`;
        axios.delete('/api/deleteArticle', {
            params: {
                _id: key
            }
        })
            .then(function (response) {
                console.log('response.data', response.data)
                this.setState({
                    articles: response.data
                });
            }
                .bind(this));

        window.location = "/";
    }

    handleShowArticle(key) {
        this.props.history.push(`/updateArticle/${key}`)
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = `bearer ${Auth.getToken()}`;
        axios.post('/api/getArticles')
            .then(function (response) {
                this.setState({
                    articles: response.data
                });
            }
                .bind(this));
    }

    render() {
        const actions = [
            <FlatButton
                label="Annuler"
                primary={true}
                onTouchTap={()=>this.handleClose()}
            />,
            <FlatButton
                label="Valider"
                primary={true}
                onTouchTap={()=>this.handleRequestDelete(this.state.key)}
            />,
        ];
        return (
            this.state.articles
                ? <div className="article-preview-container">
                {this.state.articles.map((item) =>
                    <Paper key={item._id} style={style} zDepth={3}>
                        <img className="article-preview-img" src={item.mainImg}/>
                        <div className="article-preview-title">
                            <a href="">{item.title}</a>
                        </div>
                        <IconButton className="iu-deletePreview" tooltip="Supprimer l'article" touch={true}
                                    tooltipPosition="top-right">
                            <ActionDelete onClick={() => this.handleOpen(item._id)}/>
                        </IconButton>
                        <IconButton className="iu-editPreview" tooltip="Editer l'article" touch={true}
                                    tooltipPosition="top-right">
                            <ActionDescription onClick={() => this.handleShowArticle(item._id)}/>
                        </IconButton>
                        <Dialog
                            actions={actions}
                            modal={false}
                            open={this.state.alertOpen}
                            onRequestClose={()=>this.handleClose}
                        >
                            Voulez-vous vraiment supprimer cet article ?
                        </Dialog>
                    </Paper>
                )}</div>

                : <div> Loading ... </div>
        )
    }
}

export default ThumbnailArticles