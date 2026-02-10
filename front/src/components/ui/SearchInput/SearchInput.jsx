import './SearchInput.scss';

// Иконка поиска
const SearchIcon = () => (
  <>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </>
);

// Иконка очистки
const ClearIcon = () => (
  <>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </>
);

/**
 * Компонент поля поиска
 * @param {Object} props - Свойства компонента
 * @param {string} props.value - Значение поля
 * @param {function} props.onChange - Обработчик изменения
 * @param {string} [props.placeholder='Поиск...'] - Placeholder
 * @param {string} [props.className] - Дополнительные CSS классы
 */
export function SearchInput({
  value,
  onChange,
  placeholder = 'Поиск...',
  className = '',
}) {
  const handleClear = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <div className={`search-input ${className}`.trim()}>
      <svg className="search-input__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <SearchIcon />
      </svg>
      <input
        type="text"
        className="search-input__field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {value && (
        <button
          type="button"
          className="search-input__clear"
          onClick={handleClear}
          aria-label="Очистить поиск"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ClearIcon />
          </svg>
        </button>
      )}
    </div>
  );
}
