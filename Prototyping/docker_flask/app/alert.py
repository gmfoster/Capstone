import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from twilio.rest import Client

class alert():
    def __init__(self):
        ACCOUNT_SID = "AC11b7513e541b54673230d8c5bbfc9a7f"
        AUTH_TOKEN = "7a030cf16277e88e6c5f451d50c52612"
        client = Client(ACCOUNT_SID, AUTH_TOKEN)

    def sendText(self, name, phone):
        message = client.messages.create(
            body = " " +name+ "\nYou are being alerted because a sensor from NovaSight has been triggered",
            from_ = '+19152283110',
            to = phone)
        print(message.sid)

    def sendEmail(self, name, email):
        toaddr = email
        fromaddr = "quintinhill1316@gmail.com"
        msg = MIMEMultipart()
        msg['From'] = fromaddr
        msg['To'] = toaddr
        msg['Subject'] = "NovaSight Alert"
        body = "\n"+name+"\n 1 OR MORE SENSORS HAVE FOUND DATA\n"

        msg.attach(MIMEText(body, 'plain'))

        toaddr = email
        server = smtplib.SMTP('smtp.gmail.com:587')
        server.starttls()
        server.login(fromaddr, "30261316Sss")
        server.sendmail(fromaddr, toaddr, text)
        server.quit()

