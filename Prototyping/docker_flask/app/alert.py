import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from twilio.rest import Client

class alert():
    def __init__(self):
        ACCOUNT_SID = "AC11b7513e541b54673230d8c5bbfc9a7f"
        AUTH_TOKEN = "7a030cf16277e88e6c5f451d50c52612"
        client = Client(ACCOUNT_SID, AUTH_TOKEN)

    def sendText(self):
        message = client.messages.create(
            body = "test message",
            from_ = '+19152283110',
            to = self.phone)
        print(message.sid)

    def sendEmail(self):
        toaddr = self.email
        fromaddr = "quintinhill1316@gmail.com"
        msg = MIMEMultipart()
        msg['From'] = fromaddr
        msg['To'] = toaddr
        msg['Subject'] = "NovaSight Alert"
        body = "\n"+self.name+"\n 1 OR MORE SENSORS HAVE FOUND DATA\n"

        msg.attach(MIMEText(body, 'plain'))

        toaddr = self.email
        server = smtplib.SMTP('smtp.gmail.com:587')
        server.starttls()
        server.login(fromaddr, "30261316Sss")
        server.sendmail(fromaddr, toaddr, text)
        server.quit()

