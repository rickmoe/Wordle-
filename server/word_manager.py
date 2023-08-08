from words import words as word_list
import random
from datetime import date

def get_random_element(array, seed=None):
    rand_gen = random.Random(seed)
    return array[rand_gen.randint(0, len(array) - 1)]

def filter(word_array, word_length):
    return [word for word in word_array if len(word) == word_length]

def get_daily_word():
    # Hashing the current date gives a consistent seed daily
    seed = date.today().__hash__()
    print(seed)
    return get_random_element(word_list, seed)

def get_random_words(length, count):
    filtered_words = filter(word_list, length)
    return  [get_random_element(filtered_words) for _ in range(count)]

def check_word(word):
    return word in word_list