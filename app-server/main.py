from fastapi import FastAPI
from joblib import load
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


clf_fc = load('./model/fc.joblib')
clf_slump = load('./model/slump.joblib')

def get_prediction(cement, water, flyAsh, slag, coarse, fine, plasticizer, age):
    x_fc = [[ cement, water, coarse, fine, flyAsh, slag,  plasticizer, age ]]

    y_fc = clf_fc.predict(x_fc)[0]  # just get single value

    x_slump = [[ cement, water, coarse, fine, flyAsh, slag,  plasticizer ]]
    y_slump = clf_slump.predict(x_slump)[0]
    return {'prediction-fc': y_fc, 'prediction-slump': y_slump }


@app.get("/predict")
def predict(cement: float, water: float, flyAsh: float, slag:float, coarse:float, fine: float, plasticizer: float, age: int):
    pred = get_prediction(cement, water, flyAsh, slag, coarse, fine, plasticizer, age)
    return pred
