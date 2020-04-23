import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import PolicyOutlinedIcon from '@material-ui/icons/PolicyOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './App.css';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Form(props) {
    const [enteredText, setText] = useState('');
    const [enteredURL, setURL] = useState('');
    const [submit, setSubmit] = useState(false);


    useEffect(() => {
    }, [submit]);

    const textInputHandler = e => {
        setText(e.target.value);
    };

    const urlInputHandler = e => {
        setURL(e.target.value);
    };

    const submitHandler = e => {
        e.preventDefault();
        verifai();
        setSubmit(true);
    }

    const verifai = () => {
        var message = "";
        var imageType = "";
        if (enteredText.trim().length > 0) {
            const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

            fetch(corsAnywhere + 'http://54.227.44.231//verifai?url=' + enteredURL.trim() + '&text=' + enteredText.trim(), {
                method: 'GET'
            }).then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.is_trusted_url && responseJson.is_trusted_text) {
                        message = "We're fairly confident that this article is REAL news. Both the text and source seem to be trustworthy."
                        imageType = "real";
                    } else if (responseJson.is_trusted_url && !responseJson.is_trusted_text) {
                        message = "...We're not quite sure about this article. The text seems fishy but the source is trustworthy."
                        imageType = "unsure";
                    } else if (!responseJson.is_trusted_url && responseJson.is_trusted_text) {
                        message = "We're not 100% sure, but this article seems to be REAL news."
                        imageType = "real";
                    } else {
                        message = "We're not 100% sure, but this article seems to be FAKE news."
                        imageType = "fake";
                    }

                    props.changeImage(imageType);
                    document.getElementById("message").innerHTML = message;
                });
        }
    }

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
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
                    rows={12}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={submitHandler}
                    type="submit"
                >
                    Submit
                </Button>

                <Grid container>
                    <Grid item xs>
                        <p id="message">Please enter the article text and full source URL (optional).</p>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs>
                        <Link href="https://github.com/shukieshah/VerifAI" variant="body2">
                            Github Project Repo
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
        
        
    </Container>
  );
}