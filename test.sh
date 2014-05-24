#!/bin/bash
##Author : Charmyin
            mainPid=`pstree -p | grep "sudo(69tt71)---main"`
echo $mainPid
            if [ -z "$mainPid" ]; then
               resultString="$ipNum false"
               echo "main not exist"
            fi


