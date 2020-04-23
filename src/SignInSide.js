import React, { useState, useEffect } from 'react';
// import Avatar from '@material-ui/core/Avatar';
import PolicyOutlinedIcon from '@material-ui/icons/PolicyOutlined';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


function getImage(type) {
    if (type == 'fake') {
        return fakenews_image;
    } else if (type == 'real') {
        return realnews_image;
    } else if (type == 'unsure') {
        return unsure_image;
    } else {
        return splash_image;
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: label => 'url(' + getImage(label) + ')',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'dark',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInSide(props) {

    const [enteredText, setText] = useState('');
    const [enteredURL, setURL] = useState('');
    const [submit, setSubmit] = useState(false);


    useEffect(() => {
        verifai();
    }, [submit]);

    const textInputHandler = e => {
        setText(e.target.value);
    };

    const urlInputHandler = e => {
        setURL(e.target.value);
    };

    const submitHandler = e => {
        e.preventDefault();
        setSubmit(true);
    }

    const verifai = () => {
        document.getElementById("label").innerHTML = enteredText;
    }

    const classes = useStyles(props);

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <PolicyOutlinedIcon style={{ fontSize: '64px' }} />
                    <Typography component="h1" variant="h2">
                        VerifAI
                    </Typography>
                    <Typography component="h1" variant="h6">
                        Natural Language Fake News Detection
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            value={enteredURL}
                            onChange={urlInputHandler}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Optional Source URL"
                            placeholder={enteredURL}
                            name="url"
                        />
                        <TextField
                            value={enteredText}
                            onChange={textInputHandler}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="text"
                            label="Article Text"
                            placeholder={enteredText}
                            id="text"
                            multiline
                            autoFocus
                            rows={10}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => {props.func()}}
                            type="submit"
                        >
                            Submit News
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <p id="label">Please enter the full article text and source URL.</p>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Github Project Repo
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}