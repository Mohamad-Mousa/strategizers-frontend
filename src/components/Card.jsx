const Card = ({ title, description, icon }) => {
  return (
    <div className="single-item hvr-grow-shadow text-center">
      <div className="icon-holder">
        <span className={icon}></span>
      </div>
      <div className="text-holder">
        <h3>{title}</h3>
        <span className="border"></span>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
