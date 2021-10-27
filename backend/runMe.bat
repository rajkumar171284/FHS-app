start C:\Users\kirshnan\AppData\Local\Programs\Python\Python39\python.exe .\datagen.py
timeout 1
start "C:\Program Files\nodejs\node.exe" .\mqtt2postgres.js
timeout 1
start C:\Users\kirshnan\AppData\Local\Programs\Python\Python39 .\sendSMS.py
timeout 1
start "C:\Program Files\nodejs\node.exe" .\alertusingnode.js
timeout 1
start "C:\Program Files\nodejs\node.exe" .\index.js
