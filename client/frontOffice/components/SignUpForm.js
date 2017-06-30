import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Card, CardText} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import FloatingActionButton from 'material-ui/FloatingActionButton';

const styles = {
    btnClose: {
        position: 'absolute',
        top: 100,
        right: "7%"
    }
};

const handleButtonClose = props => {
    props.history.push('/')
};

const SignUpForm = ({
    props,
    onSubmit,
    onChange,
    errors,
    successMessage,
    user,
}) => (
    <Card className="container">
        <FloatingActionButton className="btnClose" style={styles.btnClose} onClick={() => handleButtonClose(props)}>
            <div>X</div>
        </FloatingActionButton>
        <form action="/" onSubmit={onSubmit}>
            <h2 className="card-heading">S'inscrire</h2>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errors.summary && <p className="error-message">{errors.summary}</p>}

            <div className="field-line">
                <TextField
                    floatingLabelText="Nom"
                    name="name"
                    id="subscriberName"
                    errorText={errors.name}
                    onChange={onChange}
                    value={user.name}
                />
            </div>

            <div className="field-line">
                <TextField
                    floatingLabelText="Email"
                    name="email"
                    id="subscriberEmail"
                    errorText={errors.email}
                    onChange={onChange}
                    value={user.email}
                />
            </div>

            <div className="field-line">
                <TextField
                    floatingLabelText="Mot de passe"
                    id="subscriberPassword"
                    type="password"
                    name="password"
                    onChange={onChange}
                    errorText={errors.password}
                    value={user.password}
                />
            </div>

            <div className="button-line">
                <RaisedButton type="submit" label="Je m'inscris" primary/>
            </div>

            <CardText>Déjà membre ? <Link to={'/login'}>Se connecter</Link></CardText>
        </form>
    </Card>
);

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default SignUpForm;