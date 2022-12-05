import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../actions";
import Filters from "../Filters/Filters";
import Loader from "../Loader/Loader";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import Cards from "./../Cards/Cards";
import Swal from "sweetalert2";

const Home = () => {
  //TODO: ULTIMA CODEAD
  const [refresh, setRefresh] = useState("");
  const dispatch = useDispatch();

  const dogs = useSelector((state) => state.dogs);

  useEffect(() => {
    if (!dogs.length) {
      dispatch(getDogs());
      let timerInterval;
      Swal.fire({
        position: "center-start",
        title: "El back se esta levantando!",
        text: "The backend is going up",
        html: "Esto se cerrara en <b></b> millisegundos...",
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    }
  }, []);

  useEffect(() => {}, [refresh]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs?.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <NavBar />
      <div className="container_home">
        <Filters paginado={paginado} setRefresh={setRefresh} />
        <div className="view">
          {currentDogs.length ? (
            <>
              <Search paginado={paginado} />

              <Pagination
                paginado={paginado}
                dogs={dogs.length}
                dogsPerPage={dogsPerPage}
                currentPage={currentPage}
              />
              <Cards dogs={currentDogs} />
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
