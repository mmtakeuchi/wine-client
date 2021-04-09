import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getWine, deleteWine } from "../actions/wineActions";

const Wine = (props) => {
  const dispatch = useDispatch();
  const { wines } = useSelector((state) => state.wines);
  const wineId = props.match.params.id;

  useEffect(() => {
    dispatch(getWine(wineId));
  }, [wines]);

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
        <button>
          <Link to={`/wines/${wines.id}/edit`}>Edit Wine</Link>
        </button>
        <button onClick={handleDelete}>Delete Wine</button>
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
