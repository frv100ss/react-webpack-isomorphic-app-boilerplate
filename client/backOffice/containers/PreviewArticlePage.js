import React from 'react';
import Auth from '../../modules/Auth';
import axios from "axios";
import Chip from 'material-ui/Chip';
import {Card} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const dateFormat = require('dateformat');

const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

const styles = {
    tags: {
        backgroundColor: 'orange',
        borderRadius: 3,
        height:32,
        display: 'inline-block',
        marginRight:8,
        marginTop:8
    },
    hr: {
        display: 'block',
        width: '100%',
        marginTop: 25,
        border:"1px solid orange",
    },
    date:{

    },
    update:{

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
        paddingTop:20,
        textAlign: 'left',
        width: "90%",
        margin:"0 auto"
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
        setTimeout(()=>{
            if(canUseDOM){
                const imgArr = document.getElementsByTagName('img');
                for(let i=1; i<imgArr.length; i++){
                    imgArr[i].style.maxWidth='100%';
                    imgArr[i].style.height='auto';
                }
            }
        },50);
        const key = this.props.match.params.title;
        axios.defaults.headers.common['Authorization'] = `bearer ${Auth.getToken()}`;
        axios.post('/api/back/previewArticle', {
            params: {
                title: key,
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

        return (
            <Card className="preview-container" style={styles.wrapper}>
                {this.state.article.tags && this.state.article.tags.map((tag, key) =>
                    <Chip key={key} style={styles.tags}>
                        {tag}
                    </Chip>
                )}
                <hr style={styles.hr}/>
                {this.state.article.date && this.state.article.hour &&
                <time datetime={this.state.article.date} style={styles.date}>Publié le {dateFormat(this.state.article.date, "UTC:dd/mm/yyyy")} à {dateFormat(this.state.article.hour, "UTC:HH'h'MM")} </time>
                }
                {this.state.article.updateDate && this.state.article.updateHour &&
                <time datetime={this.state.article.updateDate} style={styles.update}>| Mis à jour le {dateFormat(this.state.article.updateDate, "UTC:dd/mm/yyyy")} à {dateFormat(this.state.article.updateHour, "UTC:HH'h'MM")}</time>
                }
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