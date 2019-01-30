from twilio.rest import Client

ACCOUNT_SID = "AC11b7513e541b54673230d8c5bbfc9a7f"
AUTH_TOKEN = "7a030cf16277e88e6c5f451d50c52612"

client = Client(ACCOUNT_SID, AUTH_TOKEN)

message = client.messages.create(
    body = "test message",
    from_ = '+19152283110',
    to ='+13109389250'
)

print(message.sid)
