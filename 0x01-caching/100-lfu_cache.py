#!/usr/bin/env python3
""" LFUCache module """

from base_caching import BaseCaching
from collections import OrderedDict


class LFUCache(BaseCaching):
    """ LFUCache defines an LFU caching system """

    def __init__(self):
        """ Initialize the cache """
        super().__init__()
        self.cache_data = OrderedDict()
        self.usage_count = {}

    def put(self, key, item):
        """ Add an item in the cache """
        if key and item:
            if key in self.cache_data:
                self.usage_count[key] += 1
            else:
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    lfu_key = min(
                        self.usage_count, key=lambda k: (
                            self.usage_count[k], list(
                                self.cache_data).index(k)))
                    del self.cache_data[lfu_key]
                    del self.usage_count[lfu_key]
                    print("DISCARD:", lfu_key)
                self.usage_count[key] = 1
            self.cache_data[key] = item
            self.cache_data.move_to_end(key)

    def get(self, key):
        """ Get an item by key """
        if key in self.cache_data:
            self.usage_count[key] += 1
            self.cache_data.move_to_end(key)
            return self.cache_data[key]
        return None
