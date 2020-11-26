Follow this to set up a **Raspberry Pi** for remote use over **SSH** and **WIFI** with **public and private keys**. This tutorial assumes you're just messing around with Raspberry Pi and therefore **security might be little lax**, just be aware.

### Hardware
* Raspberry pi 3 or newer
* Micro USB Power cable
* Micro SD Card (min 8GB)
* Micro SD Card slot in PC or USB dongle with Micro SD adapter
* Ethernet cable **Optional** (can be useful if debugging problems with Wifi) 

### Software
* Windows 10 expected
* [SD Card Formatter](https://www.sdcard.org/downloads/formatter/)
* [Win32 Disk imager](https://sourceforge.net/projects/win32diskimager/)
* [Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
* [PuttyGen](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
* [Raspberry Pi OS](https://www.raspberrypi.org/downloads/raspberry-pi-os/)

### Setting Up
* Create a directory anywhere on your computer to keep everything involved in one place. Consider having sub directories such as `Tools` for things like SD card formatter, putty etc, `Distros` for different OS images, `Keys` for public/private key file storage.

### Writing OS
1. If your sd card has been used before, quickly format the card by plugging it into your PC and using the SD card formatter software. Select the correct device, select Quick Format and then Click Format.
2. Download Raspberry Pi OS image from the download link. Pick the 32 bit Lite version (without GUI) or download whichever UNIX distro image you'd prefer. 
3. Download Win 32 Disk Imager, select your sd card as the device, then browse to the OS image you just downloaded. Then click Write.
4. Access the sd card from your file explorer and add a file named `ssh` (no extension) - this enables SSH from boot
5. Add another file here named `wpa_supplicant.conf`. Open this file in a text editor and copy the following snippet. This enables Wifi from boot. Change the country code to your country code [Reference here](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes). Change the ssid and psk to your networks credentials. Then save and close the file
```
country=US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="NETWORK-NAME"
    psk="NETWORK-PASSWORD"
}
```
6. Safely eject the sd card from the file explorer and then remove the drive and plug it into the Raspberry Pi.

### First Boot
1. Plug the Raspberry Pi into the power and allow some time for it to boot up
2. Access your network's router admin panel and look for connected devices. Expect to see your Pi showing up here with an IPv4 address, make note of it. 
> If it doesn't show up, allow some time for it to fully boot. If it still is not showing connect it to your router via an ethernet cable (we'll sort it out it in a minute)
3. Download and run PuTTY.exe, inputting the IP address you found in the last step. Keep port as 22, Name this session and save it for later.
4. Open a connection to your Pi by pressing the Open button and login
Username: `pi`
Password: `raspberry`
5. If your Pi wasn't working over wifi, check the console now to see if it mentions something about Wifi being blocked by rfkill. 
6. If this does show, run `rfkill list all`. See if your wireless LAN says it has a soft block, if yes, run `sudo rfkill unblock all` then reboot and remove the ethernet cable and try again from step 1 of this section

### Public / Private Keys
1. Download and run PuTTYGen.exe. Click the generate button and wiggle your mouse in the top box until done.
2. Copy the public key from the box that shows up (ensure you have all characters) to your clipboard. Then save both the public and private key somewhere on your desktop
> It'll prompt you to save with key passphrase for the private key, which you can do. This tutorial does not but it's recommended you do
3. Now in the SSH window (open a new connection via PuTTY if you closed it), run the following `mkdir ~/.ssh` to create a new directory.
4. Then run `nano ~/.ssh/authorized_keys` to create and open a new file
5. Right click anywhere in this file to paste the public key from your clipboard.
6. Close the file with `CTRL + X`, press `Y` when prompted to save and then `Enter` to confirm
7. Close the SSH connection (just close the window) and open PuTTY again. Load your saved session
8. In the `Category` tree on the left. expand `SSH` under `Connection`, then click `Auth` (don't expand it). Click the `Browse` button and find the private key you created earlier.
9. In the `Category` tree again, click `Data` under `Connection`. Set `pi` as the Auto-login username.
10. In the `Category` tree, return to `Session`, select your saved session and click `Save` to save those changes
11. Now open a new connection to your pi, expect to be logged in automatically (keyphrase needs to be used here if you protected the private key with one)
12. Disable password authentication (so you can only SSH to the Pi with keys) by running `sudo nano /etc/ssh/sshd_config` to open a config file. Here, move down the file to find `#PasswordAuthentication yes`. Remove the `#` and change to `no`. Full line to read `PasswordAuthentication no`. Close and save the file.
13. Reboot the pi to make those changes take effect with `sudo reboot now`. Close your SSH window, then open PuTTY again
14. Open a new connection to your pi once the pi is ready and expect to able to login and not see any messages about password authentication
15. If you set up the private key with a key phrase, you can avoid having to use it when you login in via PuTTY and pageant. I won't go into detail here, but explanations are on google.
