#!/bin/bash
sudo killall python3 &
sudo killall node &
python3 datagen.py &
sleep 1
node mqtt2postgres.js
sleep 1
python3 sendSMS.py
sleep 1
node alertusingnode.js
sleep 1
node index.js