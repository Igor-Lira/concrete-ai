from fastapi import FastAPI
from joblib import load
from pydantic import  BaseModel


class Dosage(BaseModel):
    cement: float
    water: float



app = FastAPI()
@app.get("/")
def read_root():
    return {"Hello": "World"}


clf = load('./model/fc.joblib')

def get_prediction(cement, water, flyAsh, slag, coarse, fine, plasticizer, age):
    x = [[ cement, water, flyAsh, slag, coarse, fine, plasticizer, age ]]

    y = clf.predict(x)[0]  # just get single value

    return {'prediction': y }


@app.get("/predict")
def predict(cement: float, water: float, flyAsh: float, slag:float, coarse:float, fine: float, plasticizer: float, age: int):
    pred = get_prediction(cement, water, flyAsh, slag, coarse, fine, plasticizer, age)
    return pred
