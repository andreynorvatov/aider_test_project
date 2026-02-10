import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/">Вернуться на главную</Link>
    </main>
  );
}

export default NotFoundPage;
