import React, {Component} from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';

const styles = {
    paper: {
        height: 225,
        width: 305,
        margin: 7,
        textAlign: 'left',
        marginBottom: 15
    },
    paperUne: {
        height: "35vw",
        width: "61vw",
        margin: 7,
        textAlign: 'left',
        marginBottom: 15
    },

};

class ThumbnailArticles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            higherOrder: ""
        };
    }

    handleShowArticle(category, key, title) {
        let refactoredTitle = title.toLowerCase().replace(/ /g, "-");
        refactoredTitle = refactoredTitle + "-" + key;
        let refactoredCategory = category.toLowerCase().replace(/ /g, "-");
        this.props.history.push(`/info/${refactoredCategory}/${refactoredTitle}`)
    }

    componentDidMount() {
        setTimeout(() => {
            axios.post('/api/front/getArticles')
                .then(function (response) {
                    this.setState({
                        articles: response.data
                    });
                    let rankOrdersArr = [];
                    for (let i = 0; i < this.state.articles.length; i++) {
                        rankOrdersArr.push(this.state.articles[i].order)
                    }
                    const higherNumber = Math.max.apply(null, rankOrdersArr);
                    this.setState({
                        higherOrder: higherNumber
                    })
                }
                    .bind(this));


        }, 200)


    }

    render() {
        return (
            this.state.articles
                ? <div className="article-preview-container-home">
                {this.state.articles.map((item) =>
                    item.order !== this.state.higherOrder
                        ? <Paper key={item._id} style={styles.paper} zDepth={3}
                                 className="boxes">
                        <img className="article-preview-img"
                             src={require(`../../../../dist/resources/${item.mainImg}`)}
                             onClick={() => this.handleShowArticle(item.tags[0], item._id, item.title)}
                        />
                        <div className="article-preview-title">
                            <a onClick={() => this.handleShowArticle(item.tags[0], item._id, item.title)}>{item.title}</a>
                        </div>
                    </Paper>
                        :
                        <div key={item._id}>
                            <header className="section-header">
                                <span className="section-header-main-text">
                                     A LA UNE
                                 </span>
                            </header>
                            <Paper style={styles.paperUne} zDepth={3}
                                   className="boxes-une">
                                <img className="article-preview-img"
                                     src={require(`../../../../dist/resources/${item.mainImg}`)}
                                     onClick={() => this.handleShowArticle(item.tags[0], item._id, item.title)}
                                />
                                <div className="article-preview-title-une">
                                    <a onClick={() => this.handleShowArticle(item.tags[0], item._id, item.title)}>{item.title}</a>
                                </div>
                            </Paper>
                        </div>
                )}</div>

                : <div> Loading ... </div>
        )
    }
}

export default ThumbnailArticles