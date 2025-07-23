from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from typing import List, Optional
from models.item import ItemCreate, ItemUpdate, ItemOut, Item

async def create_item(session: AsyncSession, item: ItemCreate) -> ItemOut:
    new_item = Item(**item.dict())
    session.add(new_item)
    await session.commit()
    await session.refresh(new_item)
    return new_item  # FastAPI сам вызовет model_validate

async def get_item(session: AsyncSession, item_id: int) -> Optional[ItemOut]:
    stmt = select(Item).where(Item.id == item_id)
    res = await session.execute(stmt)
    item = res.scalar_one_or_none()
    return item if item else None

async def get_all_items(session: AsyncSession) -> List[ItemOut]:
    stmt = select(Item)
    res = await session.execute(stmt)
    items = res.scalars().all()
    return items

async def update_item(
    session: AsyncSession, item_id: int, data: ItemUpdate
) -> Optional[ItemOut]:
    stmt = (
        update(Item)
        .where(Item.id == item_id)
        .values(**{k: v for k, v in data.dict(exclude_unset=True).items()})
        .execution_options(synchronize_session="fetch")
    )
    await session.execute(stmt)
    await session.commit()
    return await get_item(session, item_id)

async def delete_item(session: AsyncSession, item_id: int) -> bool:
    stmt = delete(Item).where(Item.id == item_id)
    res = await session.execute(stmt)
    await session.commit()
    return res.rowcount > 0
