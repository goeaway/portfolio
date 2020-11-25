1. Add Linux Projects Repository
`curl http://www.linux-projects.org/listing/uv4l_repo/lpkey.asc | sudo apt-key add -
echo 'deb http://www.linux-projects.org/listing/uv4l_repo/raspbian/stretch stretch main' | sudo tee -a /etc/apt/sources.list`

2. Update
`sudo apt-get update`

3. Install UV4L and extras
`sudo apt-get install uv4l uv4l-raspicam uv4l-raspicam-extras`

4. Edit config file for uv4l 
`sudo nano /etc/uv4l/uv4l-raspicam.conf`
_reccommended to reduce framerate, quality, frame buffers, remove text overlay_

5. Enable raspicam 
`sudo raspi-config`
Follow interfacing options and find camera to enable if it is plugged in

6. Start/Restart/Stop the service added by uv4l-raspicam-extras
`sudo service uv4l_raspicam start` <- replace start here with desired action