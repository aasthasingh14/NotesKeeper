import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  useTheme,
  AppBar,
  Toolbar,
  Typography,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  useMediaQuery,
} from "@material-ui/core";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Height,
  PostAdd,
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, deleteNotesById } from "./../actions/notes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: { 
    flexGrow: 1,
    textAlign: "center",
    backgroundColor: "#FCD0FF",
    color: "black",
    fontFamily: "monospace",
    fontWeight: "1000",
  },
  button: {
    margin: theme.spacing(5),
    fontWeight:1000,
    fontFamily: "monospace"
  },
  table: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  row: {
    backgroundColor: "#ECECEC",
  },
  heading: {
    fontFamily: "Times New Roman",
    fontWeight: "800",
  },
  tabContent: {
    fontFamily: "cursive",
  },
  rowContent: {
    backgroundColor: "#F0FFFD",
    fontFamily: "cursive",
  },
}));

function Read() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.notes?.loading);
  const notes = useSelector((state) => state.notes?.items);
  const [notesId, setNotesId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  useEffect(() => {
    console.log("loading", loading);
    if (!loading) {
      setOpen(loading);
    }
  }, [loading]);

  const openDialog = (_id) => {
    setOpen(true);
    setNotesId(_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    dispatch(deleteNotesById(notesId));
  };

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.title}>
        <Toolbar>
          <Typography variant="h3" className={classes.title}>
            NOTES KEEPER APPLICATION
          </Typography>
        </Toolbar>
      </AppBar>
       
      <TableContainer component={Paper} style={{marginTop:'50px'}}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.row}>
              <TableCell
                className={classes.heading}
                style={{ fontSize: "20px" }}
              >
                Sr.No.
              </TableCell>
              <TableCell
                className={classes.heading}
                style={{ fontSize: "20px" }}
              >
                NOTE
              </TableCell>
              <TableCell
                className={classes.heading}
                style={{ fontSize: "20px" }}
              >
                DESCRIPTION
              </TableCell>
              <TableCell
                className={classes.heading}
                style={{ fontSize: "20px" }}
              >
                TO DO
              </TableCell>
              <TableCell
                className={classes.heading}
                style={{ fontSize: "20px" }}
              >
                UPDATE
              </TableCell>
              <TableCell
                className={classes.heading}
                style={{ fontSize: "20px" }}
              >
                DELETE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((row, index) => (
              <TableRow key={index} className={classes.rowContent}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tabContent}
                  style={{ fontSize: "18px" }}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  className={classes.tabContent}
                  style={{ fontSize: "18px" }}
                >
                  {row.note}
                </TableCell>
                <TableCell
                  className={classes.tabContent}
                  style={{ fontSize: "18px" }}
                >
                  {row.description}
                </TableCell>
                <TableCell
                  className={classes.tabContent}
                  style={{ fontSize: "18px" }}
                >
                  {row.todo}
                </TableCell>
                <TableCell
                  className={classes.tabContent}
                  style={{ fontSize: "18px" }}
                >
                  <Link to={`/update/${row._id}`}>
                    <EditIcon>EDIT</EditIcon>
                  </Link>
                </TableCell>
                <TableCell
                  className={classes.tabContent}
                  style={{ fontSize: "18px" }}
                >
                  <DeleteIcon onClick={() => openDialog(row._id)}>
                    DELETE
                  </DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/create">
        <Button
          variant="contained"
          color="white"
          className={classes.button}
          startIcon={<AddIcon />}
          style={{ fontSize: "25px" }}
        >
          CREATE NOTE
        </Button>
      </Link>
      {open && (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="Delete Note"
        >
          <DialogContent style={{ width: 300 }}>
            <DialogContentText>Are you sure?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
}

export default Read;
