const imdbData = [
    ['key', 'value'],
    ['description',
        [
            '° Back in the days, I used to spend quite some time watching movies. I realized that movies I enjoyed most had a rating of at least 7.0 on IMDB. While IMDB was not that popular back than, it was not connected to Amazon Prime at all. This is different today. I wanted to see all movies available on Amazon Prime and being able to sort by their IMDB rating.',
            '° I created a backend based on PHP to parse all Amazon Prime movies by scraping their webpage and storing all movies that I found into a MongoDB. Later, I retrieved their ratings from IMDB.',
            '° Major challanges that I faced:',
            '° Free-tier Heroku pods being stopped after 20mins of uptime.',
            '° Amazon constantly changing their site structure.',
            '° Fuzzy equality in naming between movies on amazon and movies on IMDB.'
        ]
    ],
    ['time of creation', 'summer 2017'],
    ['tech used',
        [
            '° Frontend: Angular4 ',
            '° Backend: PHP, Heroku, MongoDB'
        ]
    ],
    ['tryout-url', 'discontinued'],
    ['code-repo', 'https://github.com/hanskre/imdbprime']
]

const calcData = [
    ['key', 'value'],
    ['description', 'Simple Calculator created with React as part of my https://www.freecodecamp.org Fullstack-Developer certification'],
    ['time of creation', 'summer 2020'],
    ['tech used', 'react, AWS S3 for static-site hosting'],
    ['tryout-url', 'https://calculator4711.s3.eu-central-1.amazonaws.com/index.html'],
    ['code-repo', 'https://github.com/HansKre/react-calculator']
]

const pomodoroData = [
    ['key', 'value'],
    ['description', 'Simple Pomodoro Clock created with React as part of my https://www.freecodecamp.org Fullstack-Developer certification'],
    ['time of creation', 'summer 2020'],
    ['tech used', 'react, AWS S3 for static-site hosting'],
    ['tryout-url', 'https://pomodoro4711.s3.eu-central-1.amazonaws.com/index.html'],
    ['code-repo', 'https://github.com/HansKre/react-pomodoro']
]

const immoData = [
    ['key', 'value'],
    ['description', 'With the beginning of the pandemy, I wanted to observe the impact on real estate market of my town'],
    ['time of creation', 'March 2020'],
    ['tech used',
        [
            '° AWS Lambda in Python to periodically connect to Immoscout24.de-API and retrieve, aggregate and store data into AWS DynamoDB',
            '° AWS API Gateway exposes AWS Lambda-based written in Javascript REST-API for retrieving historical data from DB',
            '° Vanilla Js with Chart.js for visualization'
        ]
    ],
    ['tryout-url',
        [
            '° http://immoscout-historical.s3-website.us-east-2.amazonaws.com',
            '° discontinued due to changed API-usage policy'
        ]
    ],
    ['code-repo', 'https://github.com/HansKre/immoscout-historical (frontend only)']
]

const dionysosData = [
    ['key', 'value'],
    ['description', 'React Homepage for my favorite local Greek Restaurant'],
    ['time of creation', 'summer 2020'],
    ['tech used', 'react, Material-UI, Netlify static-site hosting'],
    ['tryout-url', 'https://reverent-benz-f8a629.netlify.app'],
    ['code-repo', 'https://github.com/HansKre/dionysos-stuttgart-v3']
]

export {
    imdbData,
    calcData,
    pomodoroData,
    immoData,
    dionysosData
}