import './Button.scss';

/**
 * Компонент кнопки
 * @param {Object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Содержимое кнопки
 * @param {'primary' | 'secondary' | 'danger'} [props.variant='primary'] - Вариант оформления
 * @param {React.ReactNode} [props.icon] - SVG иконка
 * @param {boolean} [props.disabled=false] - Отключена ли кнопка
 * @param {boolean} [props.fullWidth=false] - Растягивать ли на всю ширину
 * @param {string} [props.className] - Дополнительные CSS классы
 * @param {function} [props.onClick] - Обработчик клика
 * @param {string} [props.type='button'] - Тип кнопки
 */
export function Button({
  children,
  variant = 'primary',
  icon,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) {
  const classNames = [
    'btn',
    `btn--${variant}`,
    fullWidth ? 'btn--full-width' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {icon && (
        <svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {icon}
        </svg>
      )}
      {children}
    </button>
  );
}
