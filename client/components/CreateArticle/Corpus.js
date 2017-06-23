import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from "./../../data/articleActionsCreators";
import {bindActionCreators} from 'redux';

const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

const modules= {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
};

const formats= [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

class Corpus extends React.Component {

    constructor(props) {
        super(props);
        this.handleCorpus = this.handleCorpus.bind(this);
        this.state={
            quill:""
        }
    }

    handleCorpus(corpus) {
        const {
            action,
        } = this.props;
        action.articleCorpus(corpus);
    };

    componentDidMount() {
        setTimeout(() => {
            if(canUseDOM){
                this.setState({
                    quill:require('react-quill')
                });
            }
        }, 400)
    }

    render() {
        const {
            corpus
        } = this.props;
        const Quill = this.state.quill;
        if (Quill) {
            return (<div>
                    <div className="corpus">Corps de l'article</div>
                    <Quill
                        theme="snow"
                        value={corpus}
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