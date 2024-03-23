import "./Card/index.css";
import { FaRegTrashCan } from "react-icons/fa6";
function Card(props) {
  const { name, description, price, status, id } = props.phone;
  const { deletItem } = props;
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body  ">
          <h5 className="card-title">
            <span>Name:</span> {name}
          </h5>
          <p className="card-text">
            <span>Desc: </span> {description}
          </p>
          <span
            className={`${status == "active" ? "text-success" : "text-danger"}`}
          >
            <span>Status: </span> {status}
          </span>
          <h5>
            <span>Price: </span>
            {price}
          </h5>
          <FaRegTrashCan
            onClick={() => {
              deletItem(id);
            }}
            style={{
              color: "red",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
