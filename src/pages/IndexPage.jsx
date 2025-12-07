import { useEffect, useState } from 'react';
import MediaCard from '@components/medias/MediaCard.jsx';
import mediasService from '@services/medias.js';

const IndexPage = () => {
  const [medias, setMedias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchMedias = async () => {
      const initialMedias = await mediasService.getAll();
      setMedias(initialMedias);
    };
    fetchMedias();
    setIsLoading(false);
  }, []);


  return (
    <>
      <h1>Peliculas</h1>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) :
        (
          <div className='row row-cols-1 row-cols-md-5 g-4'>
            {medias.map(media => (
              <MediaCard key={media.id} title={media.title} synopsis={media.synopsis} img={media.img} />
            ))}
          </div>
        )}
    </>
  )
};

export default IndexPage;
