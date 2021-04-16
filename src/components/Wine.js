import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { getWine, deleteWine, getWines } from "../actions/wineActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Link from "@material-ui/core/Link";

const Wine = (props) => {
  const dispatch = useDispatch();
  const { wines } = useSelector((state) => state.wines);
  const wineId = props.match.params.id;
  let wine;

  wine =
    wines && wines.length
      ? wines.find((wine) => wine.id === parseInt(wineId))
      : null;

  console.log(wine);

  useEffect(() => {
    dispatch(getWines());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteWine(`${wines.id}`));
    props.history.push("/wines");
  };

  console.log(wines);
  console.log(props);

  if (wines && wine) {
    return (
      <React.Fragment>
        <h1>{wine.brand}</h1>
        <p>{wine.nose}</p>
        <p>{wine.taste}</p>
        <p>{wine.varietal.name}</p>
        <p>{wine.origin.region}</p>

        <Button
          variant="outlined"
          color="default"
          size="small"
          startIcon={<EditIcon />}
        >
          <Link href={`/wines/${wine.id}/edit`}>Edit</Link>
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
        <Button variant="outlined" color="default" size="small">
          <Link href={"/wines"}>Back to wines list</Link>
        </Button>
      </React.Fragment>
    );
  }
};

export default Wine;
