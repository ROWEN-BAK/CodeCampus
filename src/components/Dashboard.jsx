import { useState } from 'react';
import '../styles/Dashboard.css';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';
import SearchBar from './SearchBar';

const Dashboard = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const allCategories = Array.from(
  new Set(courseData.flatMap((course) => course.categories))
);

  const matchesSearch = (course, Input) => {
    const q = Input.toLowerCase();
    return (
      course.title.toLowerCase().includes(q) ||
      course.description.toLowerCase().includes(q)
    );
  };

  const filteredCourses = () => {
    if (!Array.isArray(courseData)) return [];

    let base = courseData;

    // TAB FILTER
    if (activeTab === 'beginner') {
      base = base.filter((c) => c.level === 'Beginner');
    } else if (activeTab === 'gemiddeld') {
      base = base.filter((c) => c.level === 'Gemiddeld');
    } else if (activeTab === 'gevorderd') {
      base = base.filter((c) => c.level === 'Gevorderd');
    } else if (activeTab === 'populair') {
      base = [...base].sort((a, b) => b.views - a.views);
    }

    // SEARCH FILTER
    if (searchInput.trim() !== '') {
      base = base.filter((course) => matchesSearch(course, searchInput));
    }

    if (selectedCategory) {
  base = base.filter((course) =>
    course.categories.includes(selectedCategory)
  );
}

    
if (sortOption === 'rating') {
  base = [...base].sort((a, b) => b.rating - a.rating);
} else if (sortOption === 'views') {
  base = [...base].sort((a, b) => b.views - a.views);
} else if (sortOption === 'members') {
  base = [...base].sort((a, b) => b.members - a.members);
} else if (sortOption === 'level') {
  const levelOrder = { Beginner: 1, Gemiddeld: 2, Gevorderd: 3 };
  base = [...base].sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
} else if (sortOption === 'duration') {
  base = [...base].sort((a, b) => {
    const getHours = (str) => parseFloat(str);
    return getHours(a.duration) - getHours(b.duration);
  });
}


    return base;
  };

  return (
    <section className='dashboard'>
      <header className='dashboard-header'>
        <nav className='tab-buttons'>
          <button
            className={activeTab === 'all' ? 'active' : ''}
            onClick={() => setActiveTab('all')}
          >
            Alle Cursussen
          </button>
          <button
            className={activeTab === 'beginner' ? 'active' : ''}
            onClick={() => setActiveTab('beginner')}
          >
            Voor Beginners
          </button>
          <button
            className={activeTab === 'gemiddeld' ? 'active' : ''}
            onClick={() => setActiveTab('gemiddeld')}
          >
            Gemiddeld
          </button>
          <button
            className={activeTab === 'gevorderd' ? 'active' : ''}
            onClick={() => setActiveTab('gevorderd')}
          >
            Gevorderd
          </button>
          <button
            className={activeTab === 'populair' ? 'active' : ''}
            onClick={() => setActiveTab('populair')}
          >
            Meest Bekeken
          </button>
        </nav>

        {/* SEARCHBAR */}
        <SearchBar Input={searchInput} setInput={setSearchInput} />

        <div className='category-filter'>
  <label htmlFor='category'>Filter op categorie:</label>
  <select
    id='category'
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
  >
    <option value=''>-- Alle categorieën --</option>
    {allCategories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
</div>

        {/* SORT DROPDOWN */}
        <div className="sort-dropdown">
          <label htmlFor="sort">Sorteer op:</label>
          <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="">-- Geen --</option>
            <option value="rating">Rating</option>
            <option value="views">Weergaven</option>
            <option value="members">Leden</option>
            <option value="level">Moeilijkheid</option>
            <option value="duration">Duur</option>
          </select>
        </div>
      </header>

      <div className='dashboard-content'>
        <section className='main-content'>
          <h2>
            {activeTab === 'all'
              ? 'Alle Cursussen'
              : activeTab === 'beginner'
              ? 'Cursussen voor Beginners'
              : activeTab === 'gemiddeld'
              ? 'Gemiddelde Cursussen'
              : activeTab === 'gevorderd'
              ? 'Gevorderde Cursussen'
              : 'Meest Bekeken Cursussen'}
          </h2>
          <CourseList courses={filteredCourses()} />
        </section>

        <aside className='sidebar'>
          <PopularCourses courses={courseData} />
          <Statistics courses={courseData} />
        </aside>
      </div>
    </section>
  );
};

export default Dashboard;
