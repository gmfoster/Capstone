import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText

class alert():
    def __init__(self, name, email, phone):
        self.name = name 
        self.email = email
        self.phone = phone
    

    def sendEmaiil(self):
        toaddr = self.email
        fromaddr = "quintinhill1316@gmail.com"
        msg = MIMEMultipart()
        msg['From'] = fromaddr
        msg['To'] = toaddr
        msg['Subject'] = "NovaSight Alert"
        body = "\n"+self.name+"\n 1 OR MORE SENSORS HAVE FOUND DATA\n"

        msg.attach(MIMEText(body, 'plain'))

        toaddr = user.email
        server = smtplib.SMTP('smtp.gmail.com:587')
        server.starttls()
        server.login(fromaddr, "30261316Sss")
        server.sendmail(fromaddr, toaddr, text)
        server.quit()

