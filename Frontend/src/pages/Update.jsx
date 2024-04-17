import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  makeStyles,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getNotesById, updateNotesById } from "./../actions/notes";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
    buttonProgress: {
      color: "#fff",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  },
}));

function Update() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.notes?.loading);
  const notes = useSelector((state) => state.notes?.item);
  const [inputs, setInputs] = useState({
    note: "",
    description: "",
    todo: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getNotesById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (notes) {
      setInputs(notes);
    }
  }, [notes]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (!inputs.note || !inputs.description || !inputs.todo) {
      return;
    }
    dispatch(updateNotesById(id, inputs, history));
  }

  return (
    <React.Fragment>
      <h1
        style={{
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: "25px",
          marginTop: "200px",
        }}
      >
        Update Note
      </h1>
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
          name="note"
          label="Note"
          value={inputs.note}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="description"
          label="Description"
          value={inputs.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="todo"
          label="To Do"
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

export default Update;
