from scapy.all import *

# **********Credit for example code goes to https://scapy.readthedocs.io/en/latest/usage.html ********

#Scapy both sends and receives packets on different Layers of the IP/TCP stack and can be used to
#attack, sniff, forge packets, test, scan, and fingerprint
#Scapy gives all the stimuli sent and responses received

#can be used to send packets defaulted at layer 3 of tcp/ip stack
send(IP(dst="192.168.0.1")/ICMP())

#this sends packets at level 2
sendp(Ether()/IP(dst="1.2.3.4",ttl=(1,4)), iface="eth1")

#with PyX installed you can do graphical and pdf dumps
raw(packet)     #assembles the packet
hexdump(packet) #have a hexidecimal dump
ls(packet)      #list of fileds values
packet.summary()#summary of packet on one line
packet.show()   #shows developed view of packet
packet.show2()  #show but for the assembled packet
packet.sprintf()#fills a format string with fields values of packets
packet.decode_payload_as() #changes how the payload is decoded
packet.psdump() #draws a postscript diagram 
packet.pdfdump()#draws a pdf
packet.command()#returns a Scapy command that can generate the packet

#The function fuzz() is able to change any default value that is not to be 
#calculated (like checksums) by an object whose value is random and whose type
#is adapted to the field.
send(IP(dst="target")/fuzz(UDP()/NTP(version=4)),loop=1) 

#The sr() function is for sending packets and receiving answers. The function 
#returns a couple of packet and answers, and the unanswered packets.
p = sr1(IP(dst="www.slashdot.org")/ICMP()/"XXXXXXXXXXX")

# Classic SYN Scan can be initialized by executing the following command from Scapy’s prompt
sr1(IP(dst="72.14.207.99")/TCP(dport=80,flags="S"))

#We can easily capture some packets or even clone tcpdump or tshark
sniff(filter="icmp and host 66.35.250.151", count=2)

#Scapy also has a powerful TCP traceroute function. Unlike other traceroute programs 
# that wait for each node to reply before going to the next, scapy sends all the packets 
# at the same time.
traceroute(["www.yahoo.com","www.altavista.com","www.wisenut.com","www.copernic.com"],maxttl=20)
