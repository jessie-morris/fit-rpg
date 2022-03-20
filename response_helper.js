const url = "https://141f-65-60-175-56.ngrok.io";

const signupResponse = {
    "response_type": "in_channel",
    "blocks": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "You've landed on a desolate planet, the only way to survive is to generate heat through exercise. \n  Please choose a character:"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Avatar 1"
            },
            "accessory": {
                "type": "image",
                "image_url": `${url}/avatar1.png`,
                "alt_text": "Anderson"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Avatar 2"
            },
            "accessory": {
                "type": "image",
                "image_url": `${url}/avatar2.png`,
                "alt_text": "Sindel"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Avatar 3"
            },
            "accessory": {
                "type": "image",
                "image_url": `${url}/avatar3.png`,
                "alt_text": "alt text for image"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Avatar 1",
                        "emoji": true
                    },
                    "action_id": "avatar1_selected",
                    "value": "avatar1"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Avatar 2",
                        "emoji": true
                    },
                    "action_id": "avatar2_selected",
                    "value": "avatar2"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Avatar 3",
                        "emoji": true
                    },
                    "action_id": "avatar3_selected",
                    "value": "avatar3",
                }
            ]
        }
    ]
}

module.exports = {
    signupResponse 
}