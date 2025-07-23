from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from db.session import Base, engine, get_session
from models.item import ItemCreate, ItemUpdate, ItemOut
import crud


@asynccontextmanager
async def lifespan(_: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title="Async FastAPI + SQLAlchemy",
    version="1.0.0",
    lifespan=lifespan
)

@app.get("/")
async def root():
    return {"message": "Async FastAPI + SQLAlchemy работает"}

@app.post("/items", response_model=ItemOut)
async def create_item(item: ItemCreate, session: AsyncSession = Depends(get_session)):
    return await crud.create_item(session, item)

@app.get("/items", response_model=list[ItemOut])
async def get_items(session: AsyncSession = Depends(get_session)):
    return await crud.get_all_items(session)

@app.get("/items/{item_id}", response_model=ItemOut)
async def get_item(item_id: int, session: AsyncSession = Depends(get_session)):
    item = await crud.get_item(session, item_id)
    if not item:
        raise HTTPException(404, "Элемент не найден")
    return item

@app.put("/items/{item_id}", response_model=ItemOut)
async def update_item(
    item_id: int, payload: ItemUpdate, session: AsyncSession = Depends(get_session)
):
    updated = await crud.update_item(session, item_id, payload)
    if not updated:
        raise HTTPException(404, "Элемент не найден")
    return updated

@app.delete("/items/{item_id}")
async def delete_item(item_id: int, session: AsyncSession = Depends(get_session)):
    ok = await crud.delete_item(session, item_id)
    if not ok:
        raise HTTPException(404, "Элемент не найден")
    return {"ok": True}
