#!/bin/bash
#############Stop the running capture program progress###########
##----Parameter:ipid eg: ./stop.sh 15

#Load config parameters
source /etc/ipcs.config

${pipeProgramPath}stop.sh $1

