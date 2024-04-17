import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { createNotes } from "./../actions/notes";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
    buttonProgress: {
      color: "black",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  },
}));

function Create() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.notes?.loading);
  const [inputs, setInputs] = useState({
    note: "",
    description: "",
    todo: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    handleValidate(inputs);
  }, [inputs]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (handleValidate(inputs)) {
      dispatch(createNotes(inputs, history));
    }
  }

  function handleValidate(values) {
    let errors = {};
    let isValid = true;
    if (!values["note"]) {
      isValid = false;
      errors["note"] = "Enter Note";
    }
    if (!values["description"]) {
      isValid = false;
      errors["description"] = "Enter Description.";
    }
    if (!values["todo"]) {
      isValid = false;
      errors["todo"] = "Enter anything to do.";
    }
    setErrors(errors);
    return isValid;
  }

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" , fontFamily:"monospace", fontSize:"25px",marginTop:"200px"}}>Create Note</h1>
      <form
        className={classes.root}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          type="text"
          name="note"
          label="NOTE"
          value={inputs.note}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          type="text"
          name="description"
          label="DESCRIPTION"
          value={inputs.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          type="text"
          name="todo"
          label="TO DO"
          value={inputs.todo}
          onChange={handleChange}
          fullWidth
        />
        <Button
          disabled={loading}
          type="submit"
          variant="contained"
          color="white"
        >
          Submit
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </form>
    </React.Fragment>
  );
}

export default Create;
