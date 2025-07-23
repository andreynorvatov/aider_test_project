import pytest
from models.item import ItemCreate, ItemUpdate
from crud import create_item, get_item, get_all_items, update_item, delete_item

@pytest.mark.asyncio
async def test_create_item(session):
    item_data = ItemCreate(name="Test Item", description="Test Description", price=100.0)
    created_item = await create_item(session, item_data)
    assert created_item.name == "Test Item"
    assert created_item.description == "Test Description"

@pytest.mark.asyncio
async def test_get_item(session):
    item_data = ItemCreate(name="Test Item", description="Test Description", price=100.0)
    created_item = await create_item(session, item_data)
    assert created_item is not None
    
    fetched_item = await get_item(session, created_item.id)
    assert fetched_item is not None
    assert fetched_item.id == created_item.id
    assert fetched_item.name == "Test Item"

@pytest.mark.asyncio
async def test_get_all_items(session):
    item1 = ItemCreate(name="Item 1", description="Desc 1", price=100.0)
    item2 = ItemCreate(name="Item 2", description="Desc 2", price=200.0)
    await create_item(session, item1)
    await create_item(session, item2)
    
    items = await get_all_items(session)
    assert len(items) == 2
    assert items[0].name in ("Item 1", "Item 2")

@pytest.mark.asyncio
async def test_update_item(session):
    item_data = ItemCreate(name="Original", description="Original Desc", price=100.0)
    created_item = await create_item(session, item_data)
    assert created_item is not None
    
    update_data = ItemUpdate(name="Updated", description="Updated Desc")
    updated_item = await update_item(session, created_item.id, update_data)
    assert updated_item is not None
    assert updated_item.name == "Updated"
    assert updated_item.description == "Updated Desc"
    
    # Test update non-existent item
    non_existent = await update_item(session, 999, update_data)
    assert non_existent is None

@pytest.mark.asyncio
async def test_delete_item(session):
    item_data = ItemCreate(name="To Delete", description="Delete Me", price=100.0)
    created_item = await create_item(session, item_data)
    assert created_item is not None
    
    result = await delete_item(session, created_item.id)
    assert result is True
    
    deleted_item = await get_item(session, created_item.id)
    assert deleted_item is None
    
    # Test delete non-existent item
    non_existent = await delete_item(session, 999)
    assert non_existent is False
