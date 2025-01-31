FROM ubuntu:20.04

# Setup user
RUN useradd -ms /bin/bash sandbox

#setup working directory
WORKDIR /home/sandbox


#update the ubuntu machine
RUN apt-get update && apt upgrade -y

#Install nano(editor) and curl
RUN apt-get install nano curl -y

#Install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash  --&& apt-get install -y nodejs

#configuring terminal to display current working directory
RUN echo "PS1='\w'" >> /home/sandbox/.bashrc

#copy the source code to the working directory
WORKDIR /home/sandbox/app