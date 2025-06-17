import { useState } from 'react';
import '../styles/CourseCard.css';

const CourseCard = ({ course, isFavorite, toggleFavorite }) => {
  const [showModal, setShowModal] = useState(false);

  if (!course)
    return (
      <article className='course-card empty'>
        Geen cursus informatie beschikbaar
      </article>
    );

  const openVideo = () => {
    window.open(course.videoUrl, '_blank');
  };

  const handleFavoriteClick = () => {
    toggleFavorite(course.id);
  };

  return (
    <>
      <article className='course-card'>
        <figure className='course-image'>
          <img src={course.imageUrl} alt={course.title} />
          <button
            className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </figure>

        <div className='course-content'>
          <h3>{course.title}</h3>
          <p className='course-description'>{course.description}</p>
          <dl className='course-details'>
            <div>
              <dt className='visually-hidden'>Niveau</dt>
              <dd className='level'>Niveau: {course.level}</dd>
            </div>
            <div>
              <dt className='visually-hidden'>Duur</dt>
              <dd className='duration'>Duur: {course.duration}</dd>
            </div>
          </dl>
          <footer className='course-stats'>
            <span className='members'>{course.members} leden</span>
            <span className='views'>{course.views} weergaven</span>
            <span className='rating'>⭐ {course.rating}</span>
          </footer>
          <div className='course-actions'>
            <button
              className='course-button'
              onClick={() => setShowModal(true)}
            >
              Meer informatie
            </button>
          </div>
        </div>
      </article>

      {showModal && (
        <div className='modal-backdrop' onClick={() => setShowModal(false)}>
          <div
            className='modal'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='modal-close'
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>

            <img src={course.imageUrl} alt={course.title} className='modal-image' />
            <h2>
              {course.title}{' '}
              <button
                className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
                onClick={handleFavoriteClick}
                title={isFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </h2>
            <p className='modal-description'>{course.description}</p>

            <div className='modal-info'>
              <span><strong>Duur:</strong> {course.duration}</span>
              <span><strong>Leden:</strong> {course.members}</span>
              <span><strong>Weergaven:</strong> {course.views}</span>
              {course.categories?.length > 0 && (
                <span><strong>Categorieën:</strong> {course.categories.join(', ')}</span>
              )}
            </div>

            {course.objectives?.length > 0 && (
              <>
                <h4>Leermiddelen:</h4>
                <ul className='modal-objectives'>
                  {course.objectives.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </>
            )}

            <div className='modal-actions'>
              <button className='course-button' onClick={openVideo}>
                Bekijk video
              </button>
              <button
                className='course-button secondary'
                onClick={() => setShowModal(false)}
              >
                Terug naar overzicht
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;
