#!/usr/bin/env python3
"""
Pagination helper functions
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Calculate start and end indices for pagination.

    Args:
        page (int): The current page number (1-indexed)
        page_size (int): Number of items per page

    Returns:
        tuple: A tuple of (start_index, end_index)

    Example:
        >>> index_range(1, 7)
        (0, 7)
        >>> index_range(3, 15)
        (30, 45)
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size

    return (start_index, end_index)
