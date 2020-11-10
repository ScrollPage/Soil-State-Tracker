## Soil-State-Tracker

Site for placing indicators and selling sensors for spot monitoring of soil in sown fields

This is a [Django](https://www.djangoproject.com/) and [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Getting Started

1) Run the FRONTEND server (cd frontend): 

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

2) Run the BACKEND server (cd backend): 

```bash
python -m venv env
env\Scripts\activate.bat
pip install -r req.txt
```
Then you must to run your Redis server by .exe or in your docker with following command: 
```bash
docker run -d -p 6379:6379 redis
```
After you done that you should
```bash
python manage.py test
```
And ensure that everything is working just fine

And then... 
```bash
python manage.py runserver
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
