# Dockerfile to build an DOcker Image of the ConnectItEmbedded NodeJs APP
FROM    centos:centos6

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm

# Bundle app source
COPY . /src
# Install app dependencies
RUN cd /src; npm install

#RUN yum -y update; yum clean all
#RUN yum -y install epel-release; yum clean all
#RUN yum -y install mongodb-server; yum clean all
RUN mkdir -p /data/db

EXPOSE  27017
#CMD ["/usr/bin/mongod","&"]
#RUN /usr/bin/mongod &
CMD ["node", "/src/collect.js"]
#ENTRYPOINT ["/usr/bin/mongod"]
