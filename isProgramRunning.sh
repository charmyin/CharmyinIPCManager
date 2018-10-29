#!/bin/bash
##Author : Charmyin
####----Watch mmpeg is stoped, if it is stopped longer than 300 seconds, then restart it-----###

#Mmpeg will restarted after 300 seconds if the directory not updated
timeStopedRestart=300

#Load config file , dirpath
source /etc/ipcs.config

#Main path to save the images
#imageSaveMainDir=/home/media/dkapm1/

#Main app path
#pipeProgramPath=/home/cubie/Development/videocapture/VideoStreamCapture/

i=0
while read line; do
#echo $line
  if [[ -n "$line" ]]; then
    ipcConfigLineArray[i]=${line}
    ((i++))
  fi
done < /etc/ipcs.info

for ipcConfigLine in "${ipcConfigLineArray[@]}"
do
	#Get config file info
	IFS=';' read -ra ipcConfigArray <<< "$ipcConfigLine"
	ipNum=${ipcConfigArray[0]}
       #if related program is running , it shows true; if none of the related program is running , it return false;
       if [[ -n "`pstree | grep main${ipNum}`" || -n "`pstree | grep ffmpeg${ipNum}`"  ]]; then 
            resultString="$ipNum true"
       else
            resultString="$ipNum false"
       fi
       echo $resultString
	
	#at now +1 minutes <<< "sudo ./restart.sh $ipNum"
done



