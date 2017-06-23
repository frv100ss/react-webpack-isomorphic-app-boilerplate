import React from 'react';
import Auth from '../modules/Auth';
import axios from "axios";
import Chip from 'material-ui/Chip';
import {Card} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentDelete from 'material-ui/svg-icons/content/a';

const styles = {
    tags: {
        margin: 4,
        marginTop: 25,
        backgroundColor: 'orange',
        borderRadius: 3,
        display: 'inline-block',
    },
    hr: {
        display: 'block',
        width: '100%',
        marginTop: 25,
        border:"1px solid orange",
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        marginTop: 20,
    },
    corpus: {
        fontSize: 20,
        marginBottom: 20,
        marginTop: 20,
    },
    btnClose: {
        position:'absolute',
        top:100,
        right:"7%"
    },
    wrapper: {
        paddingLeft: 40,
        paddingRight: 40,
        textAlign: 'left',
        width: "90%"
    },
    mainImg:{
        width:"100%"
    }
};

class PreviewArticlePage extends React.Component {
    /**
     * Class constructor.
     */
    constructor(props, context) {
        super(props, context);
        this.state = {
            article: [],
        }
    }
    handleButtonClose(){
        this.props.history.push('/')
    }

    componentDidMount() {
        const key = this.props.match.params._id;
        axios.defaults.headers.common['Authorization'] = `bearer ${Auth.getToken()}`;
        axios.post('/api/previewArticle', {
            params: {
                _id: key
            }
        })
            .then(function (response) {
                this.setState({
                    article: response.data
                });
            }
                .bind(this));
    }

    /**
     * Render the component.
     */
    render() {

        if (this.state.article.tags) {
            console.log(this.state.article.tags)
        }
        return (
            <Card className="container" style={styles.wrapper}>
                {this.state.article.tags && this.state.article.tags.map((tag, key) =>
                    <Chip key={key} style={styles.tags}>
                        {tag}
                    </Chip>
                )}
                <hr style={styles.hr}/>
                {this.state.article.title && <h1 style={styles.title}>{this.state.article.title}</h1> }
                <FloatingActionButton style={styles.btnClose} onClick={()=>this.handleButtonClose()}>
                    <div>X</div>
                </FloatingActionButton>
                <img style={styles.mainImg} src={this.state.article.mainImg} alt=""/>
                {this.state.article.corpus && <section dangerouslySetInnerHTML={{__html: this.state.article.corpus}} style={styles.corpus}></section> }
            </Card>
        );
    }

}

export default PreviewArticlePage