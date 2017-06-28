import React, {Component} from 'react';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionDescription from 'material-ui/svg-icons/action/description';
import ActionPreview from 'material-ui/svg-icons/action/pageview';
import IconButton from 'material-ui/IconButton';
import axios from 'axios';
import Auth from '../../../modules/Auth';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
const io = require('socket.io-client')
const socket = io("localhost:8080");//Set Domain url if there is

const styles = {
    paper:{
        height: 200,
        width: 275,
        margin: 7,
        textAlign: 'left',
        marginBottom:40
    },
    thumbOff: {
        backgroundColor: '#fff',
    },
    trackOff: {
        backgroundColor: '#a8a8a8',
    },
    thumbSwitched: {
        backgroundColor: 'chartreuse',
    },
    trackSwitched: {
        backgroundColor: '#ffff0c',
    },
};

class ThumbnailArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "",
            alertOpen: false,
            articles: [],
            higherOrder:"",
            minOrder:""
        };
    }

    handleClose() {
        this.setState({alertOpen: false});
    };

    handleOpen(key) {
        this.setState({
            alertOpen: true,
            key: key
        });
    };

    handleRequestDelete(key) {
        axios.defaults.headers.common['Authorization'] = `bearer ${Auth.getToken()}`;
        axios.delete('/api/back/deleteArticle', {
            params: {
                _id: key
            }
        })
            .then(function (response) {
                this.setState({
                    articles: response.data
                });
            }
                .bind(this));

        window.location = "/";
    }

    handleRequestArticleIsVisible(key, isVisible) {
        isVisible=!isVisible;
        socket.emit('doVisibleArticle', {
            key:key,
            isVisible: isVisible
        });
        this.handleGetArticles()
    }

    handleEditArticle(key) {
        this.props.history.push(`/updateArticle/${key}`)
    }

    handleShowArticle(category, key, title) {
        let refactoredTitle = title.toLowerCase().replace(/ /g, "-");
            refactoredTitle = refactoredTitle + "-" + key;
        let refactoredCategory = category.toLowerCase().replace(/ /g, "-");
        this.props.history.push(`/previewArticle/${refactoredCategory}/${refactoredTitle}`)
    }

    handleGetArticles(){
        axios.defaults.headers.common['Authorization'] = `bearer ${Auth.getToken()}`;
        axios.post('/api/back/getArticles')
            .then(function (response) {
                this.setState({
                    articles: response.data
                });
            }
                .bind(this));

    }

    handleOrderUp(order){
        socket.emit('orderUp', {
            order:order,
            newOrder:order+1,
        });

        socket.on('orderDone', ()=> {
            setTimeout(()=>{
                this.handleGetArticles();
            }, 500)
        });
    }

    handleOrderDown(order){
        socket.emit('orderDown', {
            order:order,
            newOrder:order-1,
        });

        socket.on('orderDone', ()=> {
            setTimeout(()=>{
                this.handleGetArticles();
            }, 500)
        });
    }


    componentDidMount() {
        this.handleGetArticles();
        setTimeout(()=>{
            let rankOrdersArr = [];
            for (let i = 0; i < this.state.articles.length; i++) {
                rankOrdersArr.push(this.state.articles[i].order)
            }
            const higherNumber = Math.max.apply(null, rankOrdersArr);
            const minNumber = Math.min.apply(null, rankOrdersArr);
            this.setState({
                higherOrder: higherNumber,
                minOrder:minNumber
            })
        }, 300)

    }

    render() {
        const actions = [
            <FlatButton
                label="Annuler"
                primary={true}
                onTouchTap={() => this.handleClose()}
            />,
            <FlatButton
                label="Valider"
                primary={true}
                onTouchTap={() => this.handleRequestDelete(this.state.key)}
            />,
        ];
        return (
            this.state.articles
                ? <div className="articles-preview-container">
                {this.state.articles.map((item) =>
                    <Paper className="article-preview-box" key={item._id} style={styles.paper} zDepth={3}>
                        <div className="article-menu-item">
                            <Toggle
                                className="iu-Toggle"
                                defaultToggled={item.isVisible}
                                thumbStyle={styles.thumbOff}
                                trackStyle={styles.trackOff}
                                thumbSwitchedStyle={styles.thumbSwitched}
                                trackSwitchedStyle={styles.trackSwitched}
                                onClick={() => this.handleRequestArticleIsVisible(item._id, item.isVisible)}
                            />
                            <IconButton className="iu-deletePreview" tooltip="Supprimer" touch={true}
                                        tooltipPosition="top-right"
                                        onClick={() => this.handleOpen(item._id)}>
                                <ActionDelete />
                            </IconButton>
                            <IconButton className="iu-editPreview" tooltip="Editer" touch={true}
                                        tooltipPosition="top-right"
                                        onClick={() => this.handleEditArticle(item._id)}>
                                <ActionDescription />
                            </IconButton>
                            <IconButton className="iu-showPreview" tooltip="Prévisualiser" touch={true}
                                        tooltipPosition="top-right"
                                        onClick={() => this.handleShowArticle(item.tags[0], item._id, item.title)}>
                                <ActionPreview />
                            </IconButton>
                            { this.state.higherOrder === item.order &&
                                <div
                                    className="iu-Up-disabled">
                                    ▲
                                </div>
                            }
                            { this.state.higherOrder !== item.order &&
                            <div
                                className="iu-Up"
                                onClick={() => this.handleOrderUp(item.order)}>
                                ▲
                            </div>
                            }
                            {item.order !==this.state.minOrder &&
                            <div className="iu-Down"
                                 onClick={() => this.handleOrderDown(item.order)}>
                                ▼
                            </div>
                            }
                            { item.order === this.state.minOrder &&
                            <div className="iu-Down-disabled">
                                ▼
                            </div>
                            }
                        </div>
                        <img className="article-preview-img" src={item.mainImg}/>
                        <div className="article-preview-title">
                            <a href="">{item.title}</a>
                        </div>
                        <Dialog
                            actions={actions}
                            modal={false}
                            open={this.state.alertOpen}
                            onRequestClose={() => this.handleClose}
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