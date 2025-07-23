import pytest
import pytest_asyncio
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from db.session import Base

pytest_plugins = ('pytest_asyncio',)

TEST_DB_URL = "sqlite+aiosqlite:///:memory:"

@pytest_asyncio.fixture
async def session() -> AsyncSession:
    engine = create_async_engine(TEST_DB_URL)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    
    from sqlalchemy import text
    
    async with async_session() as session:
        # Clean database before each test
        await session.execute(text("DELETE FROM items"))
        await session.commit()
        
        try:
            yield session
        finally:
            await session.close()
            await engine.dispose()
