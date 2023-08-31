from random import Random
from pandas import read_excel
from datetime import date
from enchant import Dict
from db import connect_db, get_words, get_freq_sum, replace_word_table

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
    # Read input data from local file
    # Data spreadsheet from www.wordfrequency.info
    df = read_excel('./wordFrequency.xlsx', sheet_name=3, usecols=["word", "wordFreq"], dtype={"word": str, "wordFreq": int}).dropna()
    df["word"] = df["word"].str.lower()

    # Filter unwanted words/phrases
    df = df[df["word"].str.match(r'^[a-z]+$')]  # Only allow letters
    english_dict = Dict("en_US")
    df = df[df["word"].apply(english_dict.check)]   # Only allow English words
    df = df.groupby("word", as_index=False)["wordFreq"].sum()   # Remove duplicates
    
    data = [tuple(row) for row in df.to_numpy()]
    replace_word_table(db, cursor, data)

if __name__ == "__main__":
    populate_db()