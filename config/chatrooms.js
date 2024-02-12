const fetch = require("node-fetch");

API_BASE_URL = "https://abetclub.com/api/getApiData/";

eventDataX = [];
var data = function() {
  fetch(API_BASE_URL+"listCompetitions/4")
  .then((resp) => resp.json())
  .then((response) => {
    response.forEach(function(events){
      fetch(API_BASE_URL+"listEvents/4/"+events.competition.id)
      .then((resp) => resp.json())
      .then((resp1) => {
        // [{"event":{"id":"32672912","name":"Australia v Netherlands","countryCode":"GB","timezone":"GMT","openDate":"2023-09-30T08:30:00.000Z"},"marketCount":25,"scoreboard_id":"","selections":null,"liability_type":"0","undeclared_markets":1},{"event":{"id":"32672822","name":"India v England","countryCode":"GB","timezone":"GMT","openDate":"2023-09-30T08:30:00.000Z"},"marketCount":25,"scoreboard_id":"","selections":null,"liability_type":"0","undeclared_markets":3}]
        resp1.forEach(function(event, k){
          eventDataX.push(
            {
              id: event.event.id,
              name: event.event.name,
              openDate: event.event.openDate,
              image: 'chatrooms/terminus.jpg'
            }
          )
        })
        // console.log(eventData);
        // const createEntry1 = () => ({ message : JSON.stringify(response) })
        // handleEvent(chatroomName, createEntry1)
        // .then(() => callback(null))
        // .catch(callback)
      })
      // console.log(eventData);
    })
    eventDataX && console.log(eventDataX)
    return eventDataX;
  })
  .catch(function (err) {
    console.log("Unable to fetch -", err);
  });
 };

// data();
//  setTimeout(() => console.log(eventDataX), 2000)
module.exports = 
[
  {
    id: '32555351',
    name: '32555351',
    name2: 'South Africa Women v New Zealand Women',
    openDate: '2023-10-01T07:30:00.000Z',
    image: 'chatrooms/terminus.jpg'
  },
  {
    id: '32669201',
    name: '32669201',
    name2: 'Australia Women v West Indies Women',
    openDate: '2023-10-01T01:20:00.000Z',
    image: 'chatrooms/terminus.jpg'
  },
  {
    id: '28569726',
    name: '28569726',
    name2: 'ICC Cricket World Cup',
    openDate: '2023-11-16T12:13:00.000Z',
    image: 'chatrooms/terminus.jpg'
  }
]
// [
//   {
//     name: 'Terminus',
//     image: 'chatrooms/terminus.jpg'
//   },
//   {
//     name: 'Alexandria',
//     image: 'chatrooms/alexandria.jpg'
//   },
//   {
//     name: 'Sanctuary',
//     image: 'chatrooms/sanctuary.jpg'
//   },
//   {
//     name: 'Hilltop',
//     image: 'chatrooms/hilltop.jpg'
//   }
// ]

