import CourseCard from './CourseCard';

const CourseList = ({ courses, favorites, toggleFavorite }) => {
  if (!Array.isArray(courses) || courses.length === 0) {
    return <p className='empty-list'>Geen cursussen gevonden.</p>;
  }

  return (
    <section className='course-list'>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          isFavorite={favorites.includes(course.id)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </section>
  );
};

export default CourseList;
