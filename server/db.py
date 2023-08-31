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

##### Table Operations #####
def get_table_data(cursor) -> list[str]:
  cursor.execute(f'SELECT * FROM {TABLE_NAME}')
  return cursor.fetchall()

def get_words(cursor, length: int | None = None, prefix: str = "") -> list[str]:
  query = f'SELECT WORD FROM {TABLE_NAME} WHERE WORD LIKE "{prefix}%"'
  if length:
    query += f' AND CHAR_LENGTH(WORD) = {length}'
  cursor.execute(query)
  return [word[0] for word in cursor]

def get_freq_sum(cursor, length: int | None = None) -> int:
  query = f'SELECT SUM(FREQ) AS TOTAL FROM {TABLE_NAME}'
  if length:
    f' WHERE CHAR_LENGTH(WORD) = {length}'
  cursor.execute(query)
  for (total,) in cursor:
    return total
  return -1   # Only reached if error

def insert_words(db, cursor, data: list[tuple[str, int]]) -> None:
  cursor.executemany(f'INSERT INTO {TABLE_NAME} (WORD, FREQ) VALUES (%s,%s)', data)
  db.commit()

def replace_word_table(db, cursor, data: list[tuple[str, int]]) -> None:
  create_word_table(cursor)
  insert_words(db, cursor, data)

##### Testing & Database Init #####
if __name__ == "__main__":
  db = connect_db()
  cursor = db.cursor()
  print(get_table_data(cursor))
  db.close()