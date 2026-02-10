import './Pagination.scss';

// Иконки стрелок
const ChevronLeftIcon = () => (
  <polyline points="15 18 9 12 15 6"></polyline>
);

const ChevronRightIcon = () => (
  <polyline points="9 18 15 12 9 6"></polyline>
);

/**
 * Компонент пагинации
 * @param {Object} props - Свойства компонента
 * @param {number} props.currentPage - Текущая страница
 * @param {number} props.totalPages - Всего страниц
 * @param {function} props.onPageChange - Обработчик изменения страницы
 * @param {number} [props.itemsPerPage=10] - Элементов на странице
 * @param {number[]} [props.pageSizeOptions=[10, 25, 50, 100]] - Опции количества элементов
 * @param {function} [props.onItemsPerPageChange] - Обработчик изменения количества элементов
 * @param {string} [props.className] - Дополнительные CSS классы
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  pageSizeOptions = [10, 25, 50, 100],
  onItemsPerPageChange,
  className = '',
}) {
  const handleItemsPerPageChange = (e) => {
    if (onItemsPerPageChange) {
      onItemsPerPageChange(Number(e.target.value));
    }
  };

  return (
    <div className={`pagination ${className}`.trim()}>
      {onItemsPerPageChange && (
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
            {pageSizeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Предыдущая страница"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ChevronLeftIcon />
          </svg>
        </button>
        
        <span className="pagination-info">
          Страница {currentPage} из {totalPages}
        </span>
        
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Следующая страница"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ChevronRightIcon />
          </svg>
        </button>
      </div>
    </div>
  );
}
