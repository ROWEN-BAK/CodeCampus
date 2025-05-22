import { useState } from 'react';
import '../styles/Dashboard.css';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';
import SearchBar from './SearchBar';

const Dashboard = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchInput, setSearchInput] = useState('');

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
    if (activeTab === 'beginner') {
      base = base.filter((c) => c.level === 'Beginner');
    } else if (activeTab === 'gemiddeld') {
      base = base.filter((c) => c.level === 'Gemiddeld');
    } else if (activeTab === 'gevorderd') {
      base = base.filter((c) => c.level === 'Gevorderd');
    } else if (activeTab === 'populair') {
      base = [...base].sort((a, b) => b.views - a.views);
    }

    // filter zoekopdrachten
    if (searchInput.trim() !== '') {
      base = base.filter((course) => matchesSearch(course, searchInput));
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
