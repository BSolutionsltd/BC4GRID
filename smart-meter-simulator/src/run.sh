curl --header "Content-Type: application/json" -X POST --data "{
    \"code\": \"$CONSUMER\",
    \"firstname\": \"$CONSUMER_FIRSTNAME\",
    \"lastname\": \"$CONSUMER_LASTNAME\",
    \"email\": \"$CONSUMER_EMAIL\",
    \"password\": \"$CONSUMER_PASSWORD\",
    \"smartmeter\": {
        \"sn\": \"$SN\"
    }
}" http://sdc:5000/api/v1/user

python ./src/send.py