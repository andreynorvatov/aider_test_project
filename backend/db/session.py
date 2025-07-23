import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from sqlalchemy.pool import NullPool

DB_PATH = os.getenv("DB_PATH", os.path.join(os.path.dirname(__file__), "..", "items.db"))
os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)  # Создаем директорию если не существует
DATABASE_URL = f"sqlite+aiosqlite:///{DB_PATH}"

engine = create_async_engine(
    DATABASE_URL,
    echo=True,
    poolclass=NullPool  # Важно для SQLite
)
async_session_maker = async_sessionmaker(
    engine,
    expire_on_commit=False,
    autoflush=False
)

Base = declarative_base()

async def get_session() -> AsyncSession:
    async with async_session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
