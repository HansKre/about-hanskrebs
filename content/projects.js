const imdbData = [
    ['#', 'key', 'value'],
    ['0', 'description',
        [
            'Back in the days, I used to spend quite some time watching movies. I realized that movies I enjoyed most had a rating of at least 7.0 on IMDB. While IMDB was not that popular back than, it was not connected to Amazon Prime at all. This is different today. I wanted to see all movies available on Amazon Prime and being able to sort by their IMDB rating.',
            '',
            'I created a backend based on PHP to parse all Amazon Prime movies by scraping their webpage and storing all movies that I found into a MongoDB. Later, I retrieved their ratings from IMDB.',
            'Major challanges that I faced:',
            '',
            'Free-tier Heroku pods being stopped after 20mins of uptime.',
            'Amazon constantly changing their site structure.',
            'Fuzzy equality in naming between movies on amazon and movies on IMDB.'
        ]
    ],
    ['1', 'time of creation', 'summer 2017'],
    ['2', 'tech used',
        [
            'Frontend: Angular4 ',
            'Backend: PHP, Heroku, MongoDB'
        ]
    ],
    ['3', 'tryout-url', 'discontinued'],
]

const calcData = [
    ['#', 'key', 'value'],
    ['0', 'description', 'Simple Calculator created with React as part of my https://www.freecodecamp.org Fullstack-Developer certification'],
    ['1', 'time of creation', 'summer 2020'],
    ['2', 'tech used', 'react, AWS S3 for static-site hosting'],
    ['3', 'tryout-url', 'https://calculator4711.s3.eu-central-1.amazonaws.com/index.html'],
]

const pomodoroData = [
    ['#', 'key', 'value'],
    ['0', 'description', 'Simple Pomodoro Clock created with React as part of my https://www.freecodecamp.org Fullstack-Developer certification'],
    ['1', 'time of creation', 'summer 2020'],
    ['2', 'tech used', 'react, AWS S3 for static-site hosting'],
    ['3', 'tryout-url', 'https://pomodoro4711.s3.eu-central-1.amazonaws.com/index.html'],
]

const immoData = [
    ['#', 'key', 'value'],
    ['0', 'description', 'With the beginning of the pandemy, I wanted to observe the impact on real estate market of my town'],
    ['1', 'time of creation', 'March 2020'],
    ['2', 'tech used',
        [
            'AWS Lambda in Python to periodically connect to Immoscout24.de-API and retrieve, aggregate and store data into AWS DynamoDB',
            'AWS API Gateway exposes AWS Lambda-based written in Javascript REST-API for retrieving historical data from DB',
            'Vanilla Js with Chart.js for visualization'
        ]
    ],
    ['3', 'tryout-url',
        [
            'http://immoscout-historical.s3-website.us-east-2.amazonaws.com',
            'discontinued due to changed API-usage policy'
        ]
    ],
]

const dionysosData = [
    ['#', 'key', 'value'],
    ['0', 'description', 'React Homepage for my favorite local Greek Restaurant'],
    ['1', 'time of creation', 'summer 2020'],
    ['2', 'tech used', 'react, Material-UI, Netlify static-site hosting'],
    ['3', 'tryout-url', 'https://reverent-benz-f8a629.netlify.app'],
]

export {
    imdbData,
    calcData,
    pomodoroData,
    immoData,
    dionysosData
}