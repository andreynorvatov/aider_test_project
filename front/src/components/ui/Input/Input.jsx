import './Input.scss';

/**
 * Компонент текстового поля ввода
 * @param {Object} props - Свойства компонента
 * @param {string} props.id - ID поля
 * @param {string} props.name - Имя поля
 * @param {string} [props.label] - Метка поля
 * @param {string} props.value - Значение поля
 * @param {function} props.onChange - Обработчик изменения
 * @param {string} [props.type='text'] - Тип поля
 * @param {string} [props.placeholder] - Placeholder
 * @param {boolean} [props.disabled=false] - Отключено ли поле
 * @param {number} [props.min] - Минимальное значение (для number)
 * @param {number} [props.max] - Максимум (для number)
 * @param {string} [props.className] - Дополнительные CSS классы
 */
export function Input({
  id,
  name,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled = false,
  min,
  max,
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
      <input
        type={type}
        id={id}
        name={name}
        className="form-field__input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        {...rest}
      />
    </div>
  );
}
