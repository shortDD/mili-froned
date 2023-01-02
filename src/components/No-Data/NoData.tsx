import "./index.scss";
const NoData = ({ text }: { text: string }) => {
  return (
    <div
      className="no-comments"
      style={{
        textAlign: "center",
        marginTop: "10px",
        fontSize: "14px",
        color: "gray",
        marginBottom: "100px",
      }}
    >
      {text}
    </div>
  );
};
export default NoData;
