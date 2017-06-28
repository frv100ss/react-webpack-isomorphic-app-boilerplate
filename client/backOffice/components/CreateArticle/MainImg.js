import React, {Component} from 'react';
import ImagesUploader from 'react-images-uploader';
import {connect} from 'react-redux';
import * as actionCreators from "./../../../data/articleActionsCreators";
import {bindActionCreators} from 'redux';

const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

class MainImg extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            action,
        } = this.props;

        if(canUseDOM){
            return (
                <ImagesUploader
                    url="http://localhost:8080/upload-image"
                    optimisticPreviews
                    multiple={false}
                    label="Choisir l'image principale"
                    onLoadEnd={(err, inputId) => {
                        if (err) {
                            console.error(err);
                        }
                        //store ImagePath in Redux
                        inputId = inputId.split('/');
                        let imgPath = inputId[inputId.length-1];
                        //store ImagePath in Redux
                        action.articleAddMainImg(imgPath);
                    }}
                    // ImagePath == null into the store
                    deleteImage={() => {
                        action.articleRemoveMainImg(null)
                    }}
                />
            );
        }
        return null;

    }
}

const mapDispatchToProps = (dispatch) => {
    return {action: bindActionCreators(actionCreators, dispatch)}
};


export default connect(null, mapDispatchToProps)(MainImg)