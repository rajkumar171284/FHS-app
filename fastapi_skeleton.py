from fastapi import FastAPI
import random

app = FastAPI()

char_list = [chr(i) for i in range(97,123)]

@app.get("/")
async def root():
    return_list = [random.choice(char_list) for i in range(random.randint(3,7))]
    return_str = ""
    for i in return_list:
        return_str = return_str + i
    return {"message": return_str}


# To run: uvicorn main_fastapi:app --reload --port=8080 --host="0.0.0.0"
# REF: https://fastapi.tiangolo.com/
