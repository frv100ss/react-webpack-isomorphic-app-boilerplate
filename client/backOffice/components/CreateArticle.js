import React from 'react';
import {Card} from 'material-ui/Card';
import areIntlLocalesSupported from 'intl-locales-supported';
import DatePickerArticle from './CreateArticle/DatePicker'
import TimePickerArticle from './CreateArticle/TimePicker'
import Title from './CreateArticle/Title'
import Corpus from './CreateArticle/Corpus'
import Tags from './CreateArticle/Tags'
import MainImg from './CreateArticle/MainImg'
import RaisedButton from "material-ui/RaisedButton";

let DateTimeFormat;
/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
}
const styles = {
    errorMsg : {
        fontSize: 14,
        color: "red",
    }
};

const CreateArticle = ({props,
                       onSubmit,
                       onChange,
                       errors,
                   }) => (

        <div>
            <Card className="article-form">
                <form action="/" onSubmit={onSubmit}>
                    {errors.summary && <p className="error-message">{errors.summary}</p>}

                    <DatePickerArticle />
                    {errors.date && <p style={styles.errorMsg}>{errors.date}</p>}

                    <TimePickerArticle />
                    {errors.hour && <p style={styles.errorMsg}>{errors.hour}</p>}

                    <MainImg/>
                    {errors.mainImg && <p style={styles.errorMsg}>{errors.mainImg}</p>}

                    <Title />
                    {errors.title && <p style={styles.errorMsg}>{errors.title}</p>}

                    <Corpus/>
                    {errors.corpus && <p style={styles.errorMsg}>{errors.corpus}</p>}

                    <Tags />
                    {errors.tags && <p style={styles.errorMsg}>{errors.tags}</p>}

                    <div className="button-line">
                        <RaisedButton type="submit" label="Envoyer" primary/>
                    </div>
                </form>
            </Card>
        </div>
    )
;

export default CreateArticle;