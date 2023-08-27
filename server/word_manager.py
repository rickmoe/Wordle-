import random
from datetime import date
from db import connect_db, get_words, get_freq_sum

db = connect_db()
cursor = db.cursor()
freq_sum = get_freq_sum(cursor)
print(freq_sum)

def get_random_word(words: list[str], seed: int | None = None) -> str:
    rand_gen = random.Random(seed)
    return words[rand_gen.randint(0, len(words) - 1)]

def filter(words: list[str], length: int) -> list[str]:
    return [word for word in words if len(word) == length]

def get_daily_word() -> str:
    # Hashing the current date gives a consistent seed daily
    seed = date.today().__hash__()
    print(seed)
    words = get_words(cursor)
    return get_random_word(words, seed)

def get_random_words(length: int, num_words: int) -> list[str]:
    words = get_words(cursor, length)
    return  [get_random_word(words) for _ in range(num_words)]

def check_word(word: str) -> bool:
    words = get_words(cursor)
    return word in words