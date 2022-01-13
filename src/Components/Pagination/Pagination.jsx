import { useNavigate, useLocation } from "react-router-dom";

function Pagination(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.count / props.limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <p>PÁGINA</p>
      <div className="numbers">
        {pageNumbers.map((number) => {
          return (
            <div
              key={number}
              className={
                location.pathname == `${props.path}/${number}`
                  ? "ind-number active"
                  : "ind-number"
              }
              onClick={() =>
                navigate(`${props.path}/${number}`, { state: number })
              }
            >
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Pagination;
