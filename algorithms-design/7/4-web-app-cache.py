import redis
import json
import uvicorn
from fastapi import FastAPI
from time import sleep
from dataclasses import dataclass, asdict

app = FastAPI()

cache = redis.Redis(host='localhost', port=6379, db=0)
# cache.flushall()

@dataclass
class Product:
    id: int
    name: str = "Some product name"

    def to_json(self):
        return json.dumps(asdict(self))

class SlowDatabase:
    def __init__(self, items: dict[str, Product] = None):
        self.db = items if items else {}

    def get(self, key: str):
        print(f"[database] Requesting product #{key} ...")

        sleep(10)

        return self.db.get(key, None)

database = SlowDatabase({str(id): Product(id) for id in range(1, 101)})

# Server
@app.get("/product/{product_id}")
def read_product(product_id: int):
    id = str(product_id)
    product = cache.get(id)

    if product is not None:
        return json.loads(product)
    
    product = fetch_product_from_db(id)
    if product is None: return None

    cache.set(id, product.to_json())
    cache.expire(id, 3_600)

    return product
    
def fetch_product_from_db(product_id: int):
    data = database.get(str(product_id))
    print("[database]: ", data)
    return data
    
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000) 
    # http://127.0.0.1:8000/product/42
