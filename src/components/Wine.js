import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getWine, deleteWine } from "../actions/wineActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const Wine = (props) => {
  const dispatch = useDispatch();
  const { wines } = useSelector((state) => state.wines);
  const wineId = props.match.params.id;

  useEffect(() => {
    dispatch(getWine(wineId));
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteWine(`${wines.id}`));
    props.history.push("/wines");
  };

  console.log(wines);
  console.log(props);
  if (wines && wines.brand) {
    return (
      <React.Fragment>
        <h1>{wines.brand}</h1>
        <p>{wines.nose}</p>
        <p>{wines.taste}</p>
        <p>{wines.varietal.name}</p>
        <p>{wines.origin.region}</p>

        <Button
          variant="outlined"
          color="default"
          size="small"
          onClick={handleDelete}
          startIcon={<EditIcon />}
        >
          <Link to={`/wines/${wines.id}/edit`}>Edit</Link>
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>Sorry we could not find the selected wine.</h2>
        <button>
          <Link to="/wines">Back to wine list</Link>
        </button>
      </React.Fragment>
    );
  }
};

export default Wine;
