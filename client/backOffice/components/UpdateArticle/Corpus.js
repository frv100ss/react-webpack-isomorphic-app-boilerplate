import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from "./../../../data/articleActionsCreators";
import {bindActionCreators} from 'redux';

const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

const modules = {
    toolbar: [
        [{'header': [1, 2, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

class Corpus extends React.Component {

    constructor(props) {
        super(props);
        this.handleCorpus = this.handleCorpus.bind(this);
        this.state = ({
            corpus: "",
            quill:""
        })
    }

    handleCorpus(corpus) {
        const {
            action,
        } = this.props;

        this.setState({
            corpus: corpus
        });
        let corpusUpdated = corpus;
            corpusUpdated = corpusUpdated.replace(/\+/g, "*");
        action.articleCorpus(corpusUpdated);
    };

    handleCurrentCorpus(corpus) {
        const {
            action,
        } = this.props;

        this.setState({
            corpus: corpus
        });
        let corpusUpdated = corpus;
            corpusUpdated = corpusUpdated.replace(/\+/g, "*");
        action.articleCorpus(corpusUpdated);
    };

    componentDidMount() {
        setTimeout(() => {
            if(canUseDOM){
                this.setState({
                    corpus: this.props.corpus,
                    quill:require('react-quill')
                });
            }

            this.handleCurrentCorpus(this.state.corpus)
        }, 400)
    }

    render() {
        const Quill = this.state.quill;

        if (Quill) {
            return (<div>
                    <div className="corpus">Corps de l'article</div>
                    <Quill
                        theme="snow"
                        value={this.state.corpus}
                        onChange={this.handleCorpus}
                        modules={modules}
                        formats={formats}
                    />
                </div>

            );
        }

        else {
            return null
        }

    }
}


const mapDispatchToProps = (dispatch) => {
    return {action: bindActionCreators(actionCreators, dispatch)}
};

export default connect(null, mapDispatchToProps)(Corpus)