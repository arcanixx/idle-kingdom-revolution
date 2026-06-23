Creating SQL generator batch script...  
@echo off  
REM Generate SQL migration file  
node -e "require('fs').writeFileSync('C:/Users/Administrator/GitHub/idle-kingdom-revolution/supabase/migrations/001_initial_schema.sql',require('fs').readFileSync('C:/Users/Administrator/GitHub/idle-kingdom-revolution/scripts/sql_content.txt','utf8'),'utf8')"  
