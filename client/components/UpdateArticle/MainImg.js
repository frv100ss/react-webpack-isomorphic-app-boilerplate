import React, {Component} from 'react';
import ImagesUploader from 'react-images-uploader';
import {connect} from 'react-redux';
import * as actionCreators from "./../../data/articleActionsCreators";
import {bindActionCreators} from 'redux';

class MainImg extends Component {

    constructor(props) {
        super(props);
        this.state=({
            mainImg: ""
        })
    }

    handleCurrentMainImg(mainImg) {
        const {
            action,
        } = this.props;

        this.setState({
            mainImg:mainImg
        });

        action.articleAddMainImg(mainImg);
    };

    componentWillMount(){
        setTimeout(()=>{
            this.setState({
                mainImg:this.props.mainImg
            })
            this.handleCurrentMainImg(this.state.mainImg)
        }, 400)
    }

    render() {
        const {
            action,
        } = this.props;

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
                    action.articleAddMainImg(inputId);

                }}
                image={this.state.mainImg}
                // ImagePath == null into the store
                deleteImage={() => {
                    action.articleRemoveMainImg(null)
                }}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {action: bindActionCreators(actionCreators, dispatch)}
};

export default connect(null, mapDispatchToProps)(MainImg)