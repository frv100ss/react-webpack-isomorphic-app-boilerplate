import React from 'react';
import PropTypes from "prop-types";
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import ImagesUploader from 'react-images-uploader';
import Tags from '../containers/Tags'

let DateTimeFormat;
/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
}


const Dashboard = ({
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

        <Card className="article-form">
            <DatePicker
                floatingLabelText="Date de publication"
                floatingLabelFixed={true}
                DateTimeFormat={DateTimeFormat}
                okLabel="OK"
                cancelLabel="Annuler"
                locale="fr"
                fullWidth={true}

            />
            <ImagesUploader
                url="http://localhost:8080/upload-image"
                optimisticPreviews
                multiple={false}
                onLoadEnd={(err) => {
                    if (err) {
                        console.error(err);
                    }
                }}
                label="Choisir l'image principale"
            />
            <TextField
                floatingLabelText="Titre"
                floatingLabelFixed={true}
                fullWidth={true}

            /> <br />
            <TextField
                style={{fontSize: "14px"}}
                floatingLabelText="Corps de l'article"
                floatingLabelFixed={true}
                fullWidth={true}
                multiLine={true}
                rows={7}
            />
            <Tags/>
        </Card>
    </div>



);

Dashboard.PropTypes = {
    secretData: PropTypes.string.isRequired,
    userInformation: PropTypes.string.isRequired
};

export default Dashboard;