db = db.getSiblingDB('photo');

const pastEvent = {
    "sessionDate": new Date("10/17/2017, 5:00:00 EDT"),
    "shootType": "Wedding Event",
    "eventTitle": "Melody's Engagement Party",
    "eventPhone": "310-888-1234",
    "price": "",
    "status": "Done",
    "submitter": ObjectId("5c8db0ebf5bcb93e0712f8bd"),
    "photoLink": 
        ['https://t1.daumcdn.net/cfile/tistory/1204A51B4C4DFDA921?original',
        'https://t1.daumcdn.net/cfile/tistory/1904751D4C4DE99B1B?original',
        'https://t1.daumcdn.net/cfile/tistory/1104751D4C4DE99C1C?original',
        'https://t1.daumcdn.net/cfile/tistory/1404751D4C4DE99E1D?original',
        'https://t1.daumcdn.net/cfile/tistory/1404751D4C4DE9A11F?original',
        'https://t1.daumcdn.net/cfile/tistory/1304751D4C4DE9A724?original',
        'https://t1.daumcdn.net/cfile/tistory/1904751D4C4DE9A522?original',
        'https://t1.daumcdn.net/cfile/tistory/1704751D4C4DE9A926?original',
        'https://t1.daumcdn.net/cfile/tistory/1604751D4C4DE9AA27?original',
        'https://t1.daumcdn.net/cfile/tistory/1104751D4C4DE9AE2B?original',
        'https://t1.daumcdn.net/cfile/tistory/1304751D4C4DE9AF2C?original',
        'https://t1.daumcdn.net/cfile/tistory/1304751D4C4DE9B02D?original',
        'https://t1.daumcdn.net/cfile/tistory/1804751D4C4DE9B32F?original',
        'https://t1.daumcdn.net/cfile/tistory/2004751D4C4DE9B531?original',
        'https://t1.daumcdn.net/cfile/tistory/1304751D4C4DE9B732?original',
        'https://t1.daumcdn.net/cfile/tistory/1504751D4C4DE9B833?original',
        'https://t1.daumcdn.net/cfile/tistory/1404751D4C4DE9BE39?original',
        'https://t1.daumcdn.net/cfile/tistory/1304751D4C4DE9BF3A?original',
        'https://t1.daumcdn.net/cfile/tistory/1304751D4C4DE9C03B?original',
        'https://t1.daumcdn.net/cfile/tistory/1104A51B4C4DFDAA22?original',
        'https://t1.daumcdn.net/cfile/tistory/1704751D4C4DE9C23D?original',
        'https://t1.daumcdn.net/cfile/tistory/1104751D4C4DE9C540?original']
    ,
    "specialNote": "Sample Record",
    "updated": new Date("2/10/2019, 2:00:00 EDT")

}

const futureEvent1 = {
    "sessionDate": new Date("5/22/2019, 2:00:00 EDT"),
    "shootType": "Headshot",
    "eventTitle": "Melody's Headshot",
    "eventPhone": "310-888-1234",
    "price": "",
    "status": "Booked",
    "submitter": ObjectId("5c8db0ebf5bcb93e0712f8bd"),
    "photoLink": [],
    "specialNote": "Demo Reservation",
    "updated": new Date("2/10/2019, 2:00:00 EDT")
}

const futureEvent2 = {
    "sessionDate": new Date("8/3/2019, 5:00:00 EDT"),
    "shootType": "Headshot",
    "eventTitle": "Family Picture",
    "eventPhone": "310-888-1234",
    "price": "",
    "status": "Booked",
    "submitter": ObjectId("5c8db0ebf5bcb93e0712f8bd"),
    "photoLink": [],
    "specialNote": "Demo Reservation",
    "updated": new Date("3/14/2019, 2:00:00 EDT")
}


db.events.insert([pastEvent, futureEvent1, futureEvent2]);


