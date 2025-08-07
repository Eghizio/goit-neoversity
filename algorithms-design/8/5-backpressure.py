import asyncio
from asyncio import Queue

async def producer(queue, n):
    for i in range(n):
        await queue.put(i) # Waits untill the queue has enough capacity
        print(f"Produced {i}")
        # Simulating rapid data production
        await asyncio.sleep(0.1)
    await queue.put(None) # Completion signal

async def consumer(queue):
    while True:
        item = await queue.get()
        if item is None:
            break
        print(f"✅ Consumed {item}")
        # Simulating slow data processing
        await asyncio.sleep(0.5)
    print("Consumer done")

async def main():
    queue = Queue(maxsize=5) # Queue size limit
    await asyncio.gather(
        producer(queue, 20),
        consumer(queue)
    )

asyncio.run(main())
