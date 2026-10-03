import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

try:
    conn = psycopg2.connect(user='postgres', password='long12', host='localhost', port='5432', dbname='postgres')
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()

    db_name = 'home_repair_db'

    cursor.execute(f'''
        SELECT pg_terminate_backend(pg_stat_activity.pid)
        FROM pg_stat_activity
        WHERE pg_stat_activity.datname = '{db_name}'
          AND pid <> pg_backend_pid();
    ''')

    cursor.execute(f'DROP DATABASE IF EXISTS {db_name};')
    print('Dropped old database.')

    cursor.execute(f'CREATE DATABASE {db_name};')
    print('Created new database.')

    cursor.close()
    conn.close()
except Exception as e:
    print('Error:', e)
