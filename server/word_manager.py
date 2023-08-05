from words import words
from random import randint

def get_random_element(array):
    return array[randint(0, len(array) - 1)]

def filter(word_array, word_length):
    return [word for word in word_array if len(word) == word_length]

def get_random_words(length, count):
    filtered_words = filter(words, length)
    return  [get_random_element(filtered_words) for _ in range(count)]