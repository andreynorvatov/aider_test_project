import { getStatusClass } from '../../../utils/statusUtils';
import './StatusBadge.scss';

/**
 * Компонент бейджа статуса
 * @param {Object} props - Свойства компонента
 * @param {string} props.status - Статус для отображения
 * @param {string} [props.className] - Дополнительные CSS классы
 */
export function StatusBadge({ status, className = '' }) {
  const statusClass = getStatusClass(status);
  
  return (
    <span className={`status-badge ${statusClass} ${className}`.trim()}>
      {status}
    </span>
  );
}
