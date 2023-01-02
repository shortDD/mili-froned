import "./index.scss";
const Pagination = ({ paginaiton }: { paginaiton: (() => void)[] }) => {
  return (
    <div className="pagination">
      <div className="pagination-page-count">共{paginaiton.length}页</div>
      {paginaiton.map((e, index) => (
        <div className="pagination-page-num" key={index} onClick={e}>
          {index + 1}
        </div>
      ))}
    </div>
  );
};
export default Pagination;
