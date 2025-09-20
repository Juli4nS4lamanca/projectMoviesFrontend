const MediaCard = ({ title, img, synopsis }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img src={img} className="card-img-top card-img-media" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text media-synopsis">{synopsis}</p>
          <a href="#" className="btn btn-primary">Más información</a>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
