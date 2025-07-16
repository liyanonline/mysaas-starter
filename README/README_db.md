## Drop All Tables:
Run the following SQL command to drop all tables in the public schema. This command disables constraints temporarily to avoid foreign key conflicts:
```sql
DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;
```
## pnpm db:generate
## pnpm db:migrate


