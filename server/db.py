import mysql.connector
from os import getenv
from dotenv import load_dotenv

load_dotenv()

DB_NAME = "wordle_plus_db"
TABLE_NAME = "WORDS"
MAX_WORD_LEN = 20

##### Database Functions #####
def create_db():
  db = mysql.connector.connect(
    host=getenv("DB_URI"),
    user=getenv("DB_USER"),
    passwd=getenv("DB_PASSWORD")
  )
  cursor = db.cursor()
  cursor.execute(f'CREATE DATABASE {DB_NAME}')

def connect_db():
  return mysql.connector.connect(
    host=getenv("DB_URI"),
    user=getenv("DB_USER"),
    passwd=getenv("DB_PASSWORD"),
    database=DB_NAME
  )
##############################
##### Table Functions #####
def show_tables(cursor):
  cursor.execute("SHOW TABLES")

def create_word_table(cursor):
  drop_word_table(cursor)
  cursor.execute(f'CREATE TABLE {TABLE_NAME} (WORD VARCHAR({MAX_WORD_LEN}) NOT NULL, FREQ INT NOT NULL)')

def drop_word_table(cursor):
  cursor.execute(f'DROP TABLE IF EXISTS {TABLE_NAME}')

def describe_word_table(cursor):
  cursor.execute(f'DESCRIBE {TABLE_NAME}')
  return cursor.fetchall()
###########################
##### Table Operations #####
def get_words(cursor) -> list[str]:
  cursor.execute(f'SELECT WORD FROM {TABLE_NAME}')
  return [word[0] for word in cursor]

def get_words_by_prefix(cursor, prefix: str) -> list[str]:
  cursor.execute(f'SELECT WORD FROM {TABLE_NAME} WHERE WORD LIKE "{prefix}%"')
  return [word[0] for word in cursor]

def get_words_by_length(cursor, length: int) -> list[str]:
  cursor.execute(f'SELECT WORD FROM {TABLE_NAME} WHERE CHAR_LENGTH(WORD) = {length}')
  return [word[0] for word in cursor]

def insert_word(db, cursor, data: tuple[str, int]) -> None:
  cursor.execute(f'INSERT INTO {TABLE_NAME} (WORD, FREQ) VALUES (%s,%s)', data)
  db.commit()

def insert_words(db, cursor, dataList: list[tuple[str, int]]) -> None:
  cursor.executemany(f'INSERT INTO {TABLE_NAME} (WORD, FREQ) VALUES (%s,%s)', dataList)
  db.commit()

def delete_word(db, cursor, word: str) -> None:
  cursor.execute(f'DELETE FROM {TABLE_NAME} WHERE WORD = "{word}"')
  db.commit()
############################


##### Testing & Database Init #####
if __name__ == "__main__":
  db = connect_db()
  cursor = db.cursor()
  # insert_words(db, cursor, [('cheek', 6), ('rogue', 3), ('water', 12), ('elect', 2)])
  print(get_words(cursor))
  db.close()
###################################