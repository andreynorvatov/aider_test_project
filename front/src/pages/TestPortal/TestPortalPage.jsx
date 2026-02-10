import { useState, useMemo } from 'react';
import { TestsTable } from '../../components/features/TestsTable/TestsTable';
import { TestDetailsDrawer } from '../../components/features/TestDetailsDrawer/TestDetailsDrawer';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Pagination } from '../../components/ui/Pagination';
import { mockTests } from '../../data/mockTests';
import './TestPortalPage.scss';

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
const DEFAULT_PAGE_SIZE = 10;

// Иконки
const PlusIcon = () => (
  <>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </>
);

const RefreshIcon = () => (
  <>
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </>
);

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
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
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
          <Button variant="primary" icon={<PlusIcon />} onClick={handleCreateTest}>
            Создать новый тест
          </Button>
          <Button variant="secondary" icon={<RefreshIcon />} onClick={handleRefresh}>
            Обновить список
          </Button>
        </div>

        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Поиск по наименованию теста..."
        />
      </div>

      <div className="test-portal__content">
        <div className={`test-portal__table-container ${selectedTestId ? 'test-portal__table-container--with-drawer' : ''}`}>
          <TestsTable
            tests={paginatedTests}
            selectedTestId={selectedTestId}
            onRowClick={handleRowClick}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
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
