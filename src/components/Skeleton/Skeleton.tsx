import "./index.scss";
const Skeleton = ({ number }: { number: number }) => {
  return (
    <>
      {Array(number)
        .fill("")
        .map((_, index) => (
          <div className="video-card-skeleton" key={index}>
            <div className="card-box-skeleton">
              <div className="pic-box-skeleton"></div>
              <div className="info-skeleton">
                <div
                  style={{
                    width: "90%",
                    height: "20px",
                    backgroundColor: "#c9ccd0",
                    marginBottom: "6px",
                    borderRadius: "6px",
                  }}
                ></div>
                <div
                  style={{
                    width: "80%",
                    height: "20px",
                    backgroundColor: "#c9ccd0",
                    marginBottom: "6px",
                    borderRadius: "6px",
                  }}
                ></div>
                <div
                  style={{
                    width: "50%",
                    height: "18px",
                    backgroundColor: "#c9ccd0",
                    borderRadius: "6px",
                    marginTop: "12px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
export default Skeleton;
