import '../Input/Input.scss';

/**
 * Компонент выпадающего списка
 * @param {Object} props - Свойства компонента
 * @param {string} props.id - ID поля
 * @param {string} props.name - Имя поля
 * @param {string} [props.label] - Метка поля
 * @param {string} props.value - Значение поля
 * @param {function} props.onChange - Обработчик изменения
 * @param {Array<{value: string, label: string}>} props.options - Опции списка
 * @param {boolean} [props.disabled=false] - Отключено ли поле
 * @param {string} [props.className] - Дополнительные CSS классы
 */
export function Select({
  id,
  name,
  label,
  value,
  onChange,
  options,
  disabled = false,
  className = '',
  ...rest
}) {
  return (
    <div className={`form-field ${className}`.trim()}>
      {label && (
        <label className="form-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        className="form-field__select"
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
