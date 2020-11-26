### what is this 
- a way to control a remote control vehicle using a custom system

### why did i start this project
- was interested in remote vehicles such as fpv drones and wanted to do my own
- creating my own flight controller seemed too hard, so settled on this

### what were my main goals/requirements starting out
- to create a way to control a remote vehicle from my computer with a video feed

### how did i do it, what technologies did i use and why
- Used lego power functions because i already had some
- set it up with an ifrared sensor on the tank from pi to lego infrared receiver
- set up to use someone else's code to set the infrared light 
- was able to send http request from my computer to the pi via this guys code
- did actually work, but because of the size of the thing with the battery pack and the motors and the pi and infrared stuff decided a better approach was needed
- found someone else who had cut the motor wires and resoldered them to wires they could stick in a breadboard
- copied their hardware design of using the l293d chip to route signals from PI GPIO pins to the wires of the lego motors
- worked somewhat but only moved a little bit because i didn't have enough power for some reason
- set up to use two battery packs for in series for the motors, it worked now
- wanted to move the wiring off the breadboard and make it use a PCB instead to be smaller
- also wanted to create some kind of re usable install script so i could get another one and easily set it up
- tried to run my own install script but it ended up being a not good solution
- found docker and thought i'd give it a try
- set up docker and docker-compose with great success, with nginx container and jeepee-receiver container with the web api in it
- set up azure dev ops to build and deploy docker images with good results
- started on the streamer, found uv4l solution with webrtc wanted to route it through the docker stuff 
- couldn't get it to work through docker for some reason, couldn't find the raspicam device
- decided i had to have the uv4l service not in docker
- set up controller website with react to connect to webrtc stream and control
- started off fine, but some performance issues crept in due to overheating i think
- spent a while trying to fix but ended up just being able to use the non web rtc stream
- set up controller to use keyboard input, controller input, touch input

### conclusion
- made a pretty cool re-usable application for controlling lego vehicles and am happy with how it works (not using infrared any more)
- really enjoyed using docker + azure dev ops
- learned a fair bit about electronics, soldering and hardware