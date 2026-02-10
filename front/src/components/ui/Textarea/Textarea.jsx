import '../Input/Input.scss';

/**
 * Компонент многострочного текстового поля
 * @param {Object} props - Свойства компонента
 * @param {string} props.id - ID поля
 * @param {string} props.name - Имя поля
 * @param {string} [props.label] - Метка поля
 * @param {string} props.value - Значение поля
 * @param {function} props.onChange - Обработчик изменения
 * @param {string} [props.placeholder] - Placeholder
 * @param {boolean} [props.disabled=false] - Отключено ли поле
 * @param {number} [props.rows=4] - Количество строк
 * @param {string} [props.className] - Дополнительные CSS классы
 */
export function Textarea({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  rows = 4,
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
      <textarea
        id={id}
        name={name}
        className="form-field__textarea"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        {...rest}
      />
    </div>
  );
}
