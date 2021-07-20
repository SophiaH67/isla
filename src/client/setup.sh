#!/bin/bash

if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root" 
  exit 1
fi

useradd -m isla
cat /etc/sudoers | grep 'isla ALL' || echo 'isla ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers
(echo 'u55jXbpmPhCgC8Hr55'; echo 'u55jXbpmPhCgC8Hr55') | passwd isla

# Make slave services and stuff here