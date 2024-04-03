addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const data = await request.json()
    let send_request = new Request("https://api.mailchannels.net/tx/v1/send", {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
        },
        "body": JSON.stringify({
            "personalizations": [{
                "to": data.to
            }],
            "from": {
                "email": "contact@thecv.in",
                "name": "Cloudflare Worker",
            },
            "subject": data.subject,
            "content": data.content,
        }),
    });

    let respContent = {};
    if (request.method == "POST") {
        const resp = await fetch(send_request);
        respContent.data = await resp.json();
        respContent.status = resp.status
    }

    return new Response(JSON.stringify(respContent), {
        headers: {
            "content-type": "application/json"
        },
    })
}

// request 
// {
//     "to": [
//       {
//         "email": "pranjalmaurya01@gmail.com",
//         "name": "Pranjal"
//       }
//     ],
//     "subject": "Hello from cloudflare",
//     "content": [
//       {
//         "type": "text/html",
//         "value": "something"
//       }
//     ]
//   }
