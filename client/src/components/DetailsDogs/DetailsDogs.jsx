import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDog } from "../../actions";

const DetailsDogs = ({ match }) => {
  const dispatch = useDispatch();
  const param = match.params.breed;
  const dog = useSelector((state) => state.dog)[0];

  useEffect(() => {
    dispatch(getDog(param));
  }, [dispatch, param]);

  return (
    <div>
      {dog && (
        <>
          <h1>{dog.name}</h1>
        </>
      )}
    </div>
  );
};

export default DetailsDogs;
