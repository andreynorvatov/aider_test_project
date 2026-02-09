from collections import OrderedDict

def lru_cache_simple(max_size: int):
    def decorator(func):
        cache = OrderedDict()

        def wrapper(*args, **kwargs):
            key = (args, frozenset(kwargs.items()))

            if key in cache:
                # Move the accessed key to the end to mark it as recently used
                cache.move_to_end(key)
                return cache[key]

            result = func(*args, **kwargs)
            cache[key] = result

            if len(cache) > max_size:
                # Remove the least recently used item
                cache.popitem(last=False)

            return result

        return wrapper
    return decorator
