const Config = require("./apiGoogleConfig.json");

function createEvent(event) {
    var gapi = window.gapi
    gapi.load('client:auth2', () => {
        console.log('loaded client')

        gapi.client.init({
            apiKey: Config.apiKey,
            clientId: Config.clientId,
            discoveryDocs: Config.discoveryDocs,
            scope: Config.scope,
        })

        gapi.client.load('calendar', 'v3', () => console.log('bam!'))

        gapi.auth2.getAuthInstance().signIn().then(() => {
            var request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event,
            })
            request.execute(event => {
                console.log(event)
                window.open(event.htmlLink)
            })
        })
    })
}

export default createEvent