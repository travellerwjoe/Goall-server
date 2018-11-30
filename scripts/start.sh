# mongod -f ./mongod.conf
while [ -z "$(curl -s http://mongo:$GOALL_DB_PORT)" ]
do
    echo 'wait mongo to be running...'
    sleep 5
done

nodemon bin/server