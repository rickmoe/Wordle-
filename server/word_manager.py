from random import Random
from pandas import read_excel
from datetime import date
from db import connect_db, get_words, get_freq_sum

db = connect_db()
cursor = db.cursor()
freq_sum = get_freq_sum(cursor)
# print(freq_sum)

def get_random_word(words: list[str], seed: int | None = None) -> str:
    rand_gen = Random(seed)
    return words[rand_gen.randint(0, len(words) - 1)]

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

# Database Init
def populate_db():
    # Data spreadsheet from www.wordfrequency.info
    word_data = read_excel('./wordFrequency.xlsx', sheet_name=3)
    word_data = word_data[["word", "wordFreq"]]
    word_data = word_data.rename(columns={"wordFreq": "freq"})
    print(word_data)

if __name__ == "__main__":
    populate_db()