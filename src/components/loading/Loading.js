import "./loading.scss";
const Loading = ({ styled, width, height }) => {
  return (
    <div className="spinner" style={{ "--width": width, "--height": height, ...styled }}>
      <svg viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" className="path"></circle>
      </svg>
    </div>
  );
};

export default Loading;
