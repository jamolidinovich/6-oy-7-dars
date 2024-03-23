import { useState, useEffect, useRef } from "react";
import { BeatLoader } from "react-spinners";
import Card from "./components";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [phones, setPhones] = useState([]);
  const [pending, setPending] = useState(false);

  const nameRef = useRef("");
  const priceRef = useRef(0);
  const descRef = useRef("");
  const statusRef = useRef("active");

  useEffect(() => {
    setLoading(true);
    fetch("https://auth-rg69.onrender.com/api/products/all", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPhones(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  function validate() {
    return true;
  }
  function handleClick(e) {
    e.preventDefault();
    const isValid = validate();
    setPending(true);
    if (isValid) {
      const phone = {
        name: nameRef.current.value,
        description: descRef.current.value,
        status: statusRef.current.value,
        price: priceRef.current.value,
        category_id: 2,
      };
      fetch("https://auth-rg69.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(phone),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            let copied = JSON.parse(JSON.stringify(phones));
            copied.push(data);
            setPhones(copied);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          nameRef.current.value = "";
          descRef.current.value = "";
          statusRef.current.value = "";
          priceRef.current.value = "";
          setPending(false);
        });
    }
  }
  function handleDelete(id) {
    let isDelet = confirm("Rosdan ham o'chirmoqchimisiz?");
    if (isDelet && id) {
      fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message == "Mahsulot muvaffaqiyatli o'chirildi") {
            let copied = JSON.parse(JSON.stringify(phones));
            copied = copied.filter((el) => {
              return el.id != id;
            });
            setPhones(copied);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <>
      <div className="container mt-3 box-shadow: 8px 5px 16px -1px rgba(0,0,0,0.79); w-50">
        <h1 className="mt-4 text-center mb-2">Phones</h1>
        <form className="d-flex  gap-2 flex-column mx-auto">
          <input
            ref={nameRef}
            type="text"
            className="form-control mt-3"
            aria-describedby="emailHelp"
            placeholder="Enter name... "
          />
          <input
            ref={priceRef}
            type="number"
            className="form-control mt-3"
            aria-describedby="emailHelpp"
            placeholder="Enter price $"
          />

          <textarea
            ref={descRef}
            className="form-control mt-3 h-100"
            rows="3"
            placeholder="Enter description..."
          ></textarea>

          <select
            ref={statusRef}
            className="form-select mt-3"
            aria-label="Default select example"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            disabled={pending ? true : false}
            onClick={handleClick}
            className="btn btn-outline-success"
          >
            {pending ? "loading..." : "Save"}
          </button>
        </form>
      </div>
      <div className="card-wrapper mt-5  ">
        {loading && <BeatLoader></BeatLoader>}
        {!loading &&
          phones.map((el, index) => {
            return (
              <Card deletItem={handleDelete} key={index} phone={el}></Card>
            );
          })}
      </div>
    </>
  );
}

export default App;
