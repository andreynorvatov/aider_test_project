import { useState, useMemo } from 'react';
import { TestsTable } from '../../components/features/TestsTable/TestsTable';
import { TestDetailsDrawer } from '../../components/features/TestDetailsDrawer/TestDetailsDrawer';
import { mockTests } from '../../data/mockTests';
import './TestPortalPage.scss';

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
const DEFAULT_PAGE_SIZE = 10;

export function TestPortalPage() {
  const [tests, setTests] = useState(mockTests);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_PAGE_SIZE);

  // Фильтрация тестов по поисковому запросу
  const filteredTests = useMemo(() => {
    if (!searchQuery.trim()) return tests;
    const query = searchQuery.toLowerCase();
    return tests.filter(test => 
      test.name.toLowerCase().includes(query)
    );
  }, [tests, searchQuery]);

  // Пагинация
  const totalPages = Math.ceil(filteredTests.length / itemsPerPage);
  const paginatedTests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTests.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTests, currentPage, itemsPerPage]);

  // Обработчик изменения количества элементов на странице
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Выбранный тест для отображения в боковом меню
  const selectedTest = useMemo(() => {
    return tests.find(test => test.id === selectedTestId) || null;
  }, [tests, selectedTestId]);

  // Обработчик клика по строке таблицы
  const handleRowClick = (testId) => {
    setSelectedTestId(testId);
  };

  // Закрытие бокового меню
  const handleCloseDrawer = () => {
    setSelectedTestId(null);
  };

  // Обработчик сохранения изменений теста
  const handleSaveTest = (updatedTest) => {
    setTests(prevTests => 
      prevTests.map(test => 
        test.id === updatedTest.id ? updatedTest : test
      )
    );
  };

  // Обработчик обновления списка
  const handleRefresh = () => {
    // В реальном приложении здесь был бы API-запрос
    console.log('Обновление списка тестов...');
  };

  // Обработчик создания нового теста
  const handleCreateTest = () => {
    // В реальном приложении здесь был бы переход на форму создания
    console.log('Создание нового теста...');
  };

  // Сброс страницы при изменении фильтра
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="test-portal">
      <header className="test-portal__header">
        <h1 className="test-portal__title">Портал тестов</h1>
        <p className="test-portal__description">
          Управление и мониторинг нагрузочных и функциональных тестов
        </p>
      </header>

      <div className="test-portal__toolbar">
        <div className="test-portal__actions">
          <button className="btn btn--primary" onClick={handleCreateTest}>
            <svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Создать новый тест
          </button>
          <button className="btn btn--secondary" onClick={handleRefresh}>
            <svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            Обновить список
          </button>
        </div>

        <div className="test-portal__search">
          <svg className="test-portal__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="test-portal__search-input"
            placeholder="Поиск по наименованию теста..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="test-portal__content">
        <div className={`test-portal__table-container ${selectedTestId ? 'test-portal__table-container--with-drawer' : ''}`}>
          <TestsTable
            tests={paginatedTests}
            selectedTestId={selectedTestId}
            onRowClick={handleRowClick}
          />

          {totalPages > 1 && (
            <div className="test-portal__pagination">
              <div className="pagination-size">
                <label className="pagination-size__label" htmlFor="items-per-page">
                  Элементов на странице:
                </label>
                <select
                  id="items-per-page"
                  className="pagination-size__select"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                >
                  {PAGE_SIZE_OPTIONS.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="pagination-controls">
                <button
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                
                <span className="pagination-info">
                  Страница {currentPage} из {totalPages}
                </span>
                
                <button
                  className="pagination-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {selectedTest && (
          <TestDetailsDrawer
            test={selectedTest}
            onClose={handleCloseDrawer}
            onSave={handleSaveTest}
          />
        )}
      </div>

      {selectedTestId && (
        <div className="test-portal__overlay" onClick={handleCloseDrawer} />
      )}
    </div>
  );
}
