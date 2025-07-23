from sqlalchemy import Integer, String, Float, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from pydantic import BaseModel
from backend.db.session import Base

# SQLAlchemy модель
class Item(Base):
    __tablename__ = "items"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    is_available: Mapped[bool] = mapped_column(Boolean, default=True)

# Pydantic модели
class ItemCreate(BaseModel):
    name: str
    description: str | None = None
    price: float
    is_available: bool = True

    model_config = {"from_attributes": True}

class ItemUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    price: float | None = None
    is_available: bool | None = None

    model_config = {"from_attributes": True}

class ItemOut(ItemCreate):
    id: int

    model_config = {"from_attributes": True}
