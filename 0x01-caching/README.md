# Caching System Implementation

## Description
This project implements various caching systems using Python. Each system inherits from a base caching class and implements different cache replacement policies.

## Project Structure
```
0x01-caching/
│
├── 0-basic_cache.py
├── 1-fifo_cache.py
├── 2-lifo_cache.py
├── 3-lru_cache.py
├── 4-mru_cache.py
├── 100-lfu_cache.py
└── README.md
```

## Cache Types Implemented

1. **Basic Cache**: A simple unlimited cache system
2. **FIFO (First-In-First-Out)**: Removes the first item that was added to the cache
3. **LIFO (Last-In-First-Out)**: Removes the last item that was added to the cache
4. **LRU (Least Recently Used)**: Removes the least recently accessed item
5. **MRU (Most Recently Used)**: Removes the most recently accessed item
6. **LFU (Least Frequently Used)**: Removes the least frequently accessed item

## Requirements

* Ubuntu 18.04 LTS
* Python 3.7
* pycodestyle 2.5

## Setting Up

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Navigate to the project directory:
```bash
cd 0x01-caching
```

## File Descriptions

* `base_caching.py`: Base class with basic caching system structure
* `0-basic_cache.py`: Basic caching system with no limit
* `1-fifo_cache.py`: FIFO caching system
* `2-lifo_cache.py`: LIFO caching system
* `3-lru_cache.py`: LRU caching system
* `4-mru_cache.py`: MRU caching system
* `100-lfu_cache.py`: LFU caching system

## Testing

Each file has a corresponding test main file in the same directory.

## Usage Example

```python
#!/usr/bin/python3
BasicCache = __import__('0-basic_cache').BasicCache

my_cache = BasicCache()
my_cache.print_cache()
my_cache.put("A", "Hello")
my_cache.put("B", "World")
my_cache.put("C", "Holberton")
my_cache.print_cache()
print(my_cache.get("A"))
```

## Author
Silas Edet/silasedetsnr@gmail.com

## License
This license belongs to Silas Edet and ALX Africa
