import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

try:
    conn = psycopg2.connect(user='postgres', password='long12', host='localhost', port='5432', dbname='home_repair_db')
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    cursor.execute('CREATE EXTENSION IF NOT EXISTS postgis;')
    print('Created postgis extension.')
    cursor.close()
    conn.close()
except Exception as e:
    print('Error:', e)
