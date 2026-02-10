import { StatusBadge } from '../../ui/StatusBadge';
import { formatDateTime } from '../../../utils/dateUtils';
import './TestsTable.scss';

export function TestsTable({ tests, selectedTestId, onRowClick }) {
  return (
    <div className="tests-table-container">
      <table className="tests-table">
        <thead className="tests-table__head">
          <tr>
            <th className="tests-table__th tests-table__th--id">ID</th>
            <th className="tests-table__th tests-table__th--name">Наименование теста</th>
            <th className="tests-table__th tests-table__th--status">Статус</th>
            <th className="tests-table__th tests-table__th--time">Время запуска</th>
            <th className="tests-table__th tests-table__th--time">Время завершения</th>
          </tr>
        </thead>
        <tbody className="tests-table__body">
          {tests.length === 0 ? (
            <tr className="tests-table__empty-row">
              <td colSpan={5} className="tests-table__empty-cell">
                Тесты не найдены
              </td>
            </tr>
          ) : (
            tests.map(test => (
              <tr
                key={test.id}
                className={`tests-table__row ${selectedTestId === test.id ? 'tests-table__row--selected' : ''}`}
                onClick={() => onRowClick(test.id)}
              >
                <td className="tests-table__td tests-table__td--id">{test.id}</td>
                <td className="tests-table__td tests-table__td--name">{test.name}</td>
                <td className="tests-table__td">
                  <StatusBadge status={test.status} />
                </td>
                <td className="tests-table__td tests-table__td--time">
                  {formatDateTime(test.startTime)}
                </td>
                <td className="tests-table__td tests-table__td--time">
                  {formatDateTime(test.endTime)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
