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
	#ipcConfigArray=($(echo $ipcConfigLine | tr ";" "\n"))
	IFS=';' read -ra ipcConfigArray <<< "$ipcConfigLine"
	ipNum=${ipcConfigArray[0]}
	#Show time difference between latest directory modified time and current time
	latestDirName=`ls $imageSaveMainDir$ipNum | sort -nr | head -1`
#	echo "ls $imageSaveMainDir$ipNum | sort -nr | head -1"
#	echo latestDirName is $latestDirName
	latestDirModiTime=`date --utc --reference=$imageSaveMainDir${ipNum}/$latestDirName +%s`
	currentTime=`date --utc +%s`
	let "timeDifference=currentTime - latestDirModiTime"
        #Is run out of time
        resultString="$ipNum false"
	if [ "$timeDifference" -gt "$timeStopedRestart" ]; then
            resultString="$ipNum true"
	fi

	echo $resultString
	
	#at now +1 minutes <<< "sudo ./restart.sh $ipNum"
done



