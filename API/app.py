from datetime import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Text, Optional
from uuid import uuid4 as uuid
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:8000/", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)








@app.get('/posts')
def get_posts():
    data = pd.read_csv(r'average-height-of-men.csv')
    df = pd.DataFrame(data).rename(columns={"Mean male height (cm)":"mean_male_height"}).groupby(['Entity'])[['mean_male_height']].max()
    return df.to_json(orient="table")


