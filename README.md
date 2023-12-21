# BC4GRID

Repository for power-grid energy trading via blockchain

## Ethereum DApp Interface

This project provides a user interface for interacting with the Ethereum blockchain. It allows users to interact with smart contracts, monitor blockchain events, and view network status information.

## Features

- **Network status display**: Shows connected status, wallet address, network ID, gas limit, base fee, and priority fee.
- **Wallet input**: Allows input of wallet address and private key.
- **Contract interaction**: Loads and displays smart contract tabs and details.
- **Console output**: Handles console output for transactions, calls, etc.
- **Event loading**: Loads and displays smart contract events.
- **Blockchain interaction**: Provides UI for deploying and calling contracts.
- **Dashboard**: In the current phase dashboard shows a basic API functionalities. The dashboard will be enhanced with the following features:
  - **Real-time updates**: Display real-time updates of blockchain transactions and events.
  - **Contract management**: Provide an interface for managing and interacting with multiple smart contracts.
  - **Data visualization**: Use charts and graphs to visualize blockchain data and smart contract interactions.
  - **Search and filter**: Add functionality to search and filter through blockchain events and transactions.
  - **User management**: If your DApp has user accounts,  a dashboard for managing user information and activity is provided.

## Main Files

- `index.html`: The main page of the application. It includes Bootstrap for styling and the Web3.js library for interacting with Ethereum nodes.
- `scripts/bc4grid.js`: This script file defines classes and functions for interacting with the Ethereum blockchain using Web3.js.

## How to Use

1. Open `index.html` in your web browser.
2. Connect to your Ethereum node and input your wallet credentials.
3. Use the interface to interact with your smart contracts and monitor blockchain events.

## Dependencies

- [Bootstrap](https://getbootstrap.com/): Used for styling the application.
- [Web3.js](https://web3js.readthedocs.io/): A collection of libraries that allow you to interact with a local or remote Ethereum node using HTTP, IPC or WebSocket.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

Not sure what licence should be here :-) 

## Docker issues

```
2023-12-21 15:53:09 sim1-1                  | 2023-12-21 14:53:09 - send - ERROR - Simulation data file cannot be opened. Message: [Errno 2] No such file or directory: './data/Dataset.xlsx'
2023-12-21 15:53:09 sim1-1                  | Traceback (most recent call last):
2023-12-21 15:53:09 sim1-1                  |   File "/root/./src/send.py", line 137, in <module>
2023-12-21 15:53:09 sim1-1                  |     df = df_climate,
2023-12-21 15:53:09 sim1-1                  |          ^^^^^^^^^^
2023-12-21 15:53:09 sim1-1                  | NameError: name 'df_climate' is not defined
2023-12-21 18:36:31 sim1-1                  | 2023-12-21 17:36:31 - send - ERROR - Simulation data file cannot be opened. Message: [Errno 2] No such file or directory: './data/Dataset.xlsx'
2023-12-21 18:36:31 sim1-1                  | Traceback (most recent call last):
2023-12-21 18:36:31 sim1-1                  |   File "/root/./src/send.py", line 137, in <module>
2023-12-21 18:36:31 sim1-1                  |     df = df_climate,
2023-12-21 18:36:31 sim1-1                  |          ^^^^^^^^^^
2023-12-21 18:36:31 sim1-1                  | NameError: name 'df_climate' is not defined
2023-12-21 15:53:08 db-1                    | The files belonging to this database system will be owned by user "postgres".
2023-12-21 15:53:08 db-1                    | This user must also own the server process.
2023-12-21 15:53:08 db-1                    | 
2023-12-21 15:53:08 db-1                    | The database cluster will be initialized with locale "en_US.utf8".
2023-12-21 15:53:08 db-1                    | The default database encoding has accordingly been set to "UTF8".
2023-12-21 15:53:08 db-1                    | The default text search configuration will be set to "english".
2023-12-21 15:53:08 db-1                    | 
2023-12-21 15:53:08 db-1                    | Data page checksums are disabled.
2023-12-21 15:53:08 db-1                    | 
2023-12-21 15:53:08 db-1                    | fixing permissions on existing directory /var/lib/postgresql/data ... ok
2023-12-21 15:53:08 db-1                    | creating subdirectories ... ok
2023-12-21 15:53:08 db-1                    | selecting dynamic shared memory implementation ... posix
2023-12-21 15:53:08 db-1                    | selecting default max_connections ... 100
2023-12-21 15:53:08 db-1                    | selecting default shared_buffers ... 128MB
2023-12-21 15:53:08 db-1                    | selecting default time zone ... Etc/UTC
2023-12-21 15:53:08 db-1                    | creating configuration files ... ok
2023-12-21 15:53:08 db-1                    | running bootstrap script ... ok
2023-12-21 15:53:09 db-1                    | performing post-bootstrap initialization ... ok
2023-12-21 15:53:09 db-1                    | syncing data to disk ... ok
2023-12-21 15:53:09 db-1                    | 
2023-12-21 15:53:09 db-1                    | 
2023-12-21 15:53:09 db-1                    | Success. You can now start the database server using:
2023-12-21 15:53:09 db-1                    | 
2023-12-21 15:53:09 db-1                    |     pg_ctl -D /var/lib/postgresql/data -l logfile start
2023-12-21 15:53:09 db-1                    | 
2023-12-21 15:53:09 db-1                    | initdb: warning: enabling "trust" authentication for local connections
2023-12-21 15:53:09 db-1                    | initdb: hint: You can change this by editing pg_hba.conf or using the option -A, or --auth-local and --auth-host, the next time you run initdb.
2023-12-21 15:53:09 db-1                    | waiting for server to start....2023-12-21 14:53:09.959 UTC [48] LOG:  starting PostgreSQL 16.1 (Debian 16.1-1.pgdg120+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 12.2.0-14) 12.2.0, 64-bit
2023-12-21 15:53:09 db-1                    | 2023-12-21 14:53:09.964 UTC [48] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2023-12-21 15:53:09 db-1                    | 2023-12-21 14:53:09.980 UTC [51] LOG:  database system was shut down at 2023-12-21 14:53:09 UTC
2023-12-21 15:53:09 db-1                    | 2023-12-21 14:53:09.988 UTC [48] LOG:  database system is ready to accept connections
2023-12-21 15:53:10 db-1                    |  done
2023-12-21 15:53:10 db-1                    | server started
2023-12-21 15:53:10 db-1                    | 
2023-12-21 15:53:10 db-1                    | /usr/local/bin/docker-entrypoint.sh: ignoring /docker-entrypoint-initdb.d/*
2023-12-21 15:53:10 db-1                    | 
2023-12-21 15:53:10 db-1                    | waiting for server to shut down...2023-12-21 14:53:10.068 UTC [48] LOG:  received fast shutdown request
2023-12-21 15:53:10 db-1                    | .2023-12-21 14:53:10.073 UTC [48] LOG:  aborting any active transactions
2023-12-21 15:53:10 db-1                    | 2023-12-21 14:53:10.074 UTC [48] LOG:  background worker "logical replication launcher" (PID 54) exited with exit code 1
2023-12-21 15:53:10 db-1                    | 2023-12-21 14:53:10.075 UTC [49] LOG:  shutting down
2023-12-21 15:53:10 db-1                    | 2023-12-21 14:53:10.079 UTC [49] LOG:  checkpoint starting: shutdown immediate
2023-12-21 15:53:10 db-1                    | 2023-12-21 14:53:10.125 UTC [49] LOG:  checkpoint complete: wrote 3 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.017 s, sync=0.004 s, total=0.051 s; sync files=2, longest=0.002 s, average=0.002 s; distance=0 kB, estimate=0 kB; lsn=0/14EAA70, redo lsn=0/14EAA70
2023-12-21 15:53:10 db-1                    | 2023-12-21 14:53:10.129 UTC [48] LOG:  database system is shut down
2023-12-21 15:53:10 db-1                    |  done
2023-12-21 15:53:10 db-1                    | server stopped
2023-12-21 15:53:10 db-1                    | 
2023-12-21 15:53:10 db-1                    | PostgreSQL init process complete; ready for start up.
2023-12-21 15:53:10 db-1                    | 
2023-12-21 15:53:10 db-1                    | 2023-12-21 14:53:10.189 UTC [1] LOG:  starting PostgreSQL 16.1 (Debian 16.1-1.pgdg120+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 12.2.0-14) 12.2.0, 64-bit
2023-12-21 15:53:10 db-1                    | 2023-12-21 14:53:10.189 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2023-12-21 15:53:10 db-1                    | 2023-12-21 14:53:10.189 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2023-12-21 15:53:10 db-1                    | 2023-12-21 14:53:10.198 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2023-12-21 15:53:10 db-1                    | 2023-12-21 14:53:10.207 UTC [62] LOG:  database system was shut down at 2023-12-21 14:53:10 UTC
2023-12-21 15:53:10 db-1                    | 2023-12-21 14:53:10.213 UTC [1] LOG:  database system is ready to accept connections
2023-12-21 15:58:10 db-1                    | 2023-12-21 14:58:10.298 UTC [60] LOG:  checkpoint starting: time
2023-12-21 15:58:14 db-1                    | 2023-12-21 14:58:14.455 UTC [60] LOG:  checkpoint complete: wrote 44 buffers (0.3%); 0 WAL file(s) added, 0 removed, 0 recycled; write=4.129 s, sync=0.014 s, total=4.158 s; sync files=11, longest=0.007 s, average=0.002 s; distance=261 kB, estimate=261 kB; lsn=0/152BEC8, redo lsn=0/152BE90
2023-12-21 18:36:29 db-1                    | 2023-12-21 17:36:29.719 UTC [1] LOG:  received fast shutdown request
2023-12-21 18:36:29 db-1                    | 2023-12-21 17:36:29.731 UTC [1] LOG:  aborting any active transactions
2023-12-21 18:36:29 db-1                    | 2023-12-21 17:36:29.737 UTC [1] LOG:  background worker "logical replication launcher" (PID 65) exited with exit code 1
2023-12-21 18:36:29 db-1                    | 2023-12-21 17:36:29.738 UTC [60] LOG:  shutting down
2023-12-21 18:36:29 db-1                    | 2023-12-21 17:36:29.752 UTC [60] LOG:  checkpoint starting: shutdown immediate
2023-12-21 18:36:29 db-1                    | 2023-12-21 17:36:29.800 UTC [60] LOG:  checkpoint complete: wrote 0 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.013 s, sync=0.001 s, total=0.061 s; sync files=0, longest=0.000 s, average=0.000 s; distance=0 kB, estimate=234 kB; lsn=0/152BF78, redo lsn=0/152BF78
2023-12-21 18:36:29 db-1                    | 2023-12-21 17:36:29.807 UTC [1] LOG:  database system is shut down
2023-12-21 18:36:30 db-1                    | 
2023-12-21 18:36:30 db-1                    | PostgreSQL Database directory appears to contain a database; Skipping initialization
2023-12-21 18:36:30 db-1                    | 
2023-12-21 18:36:30 db-1                    | 2023-12-21 17:36:30.108 UTC [1] LOG:  starting PostgreSQL 16.1 (Debian 16.1-1.pgdg120+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 12.2.0-14) 12.2.0, 64-bit
2023-12-21 18:36:30 db-1                    | 2023-12-21 17:36:30.109 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2023-12-21 18:36:30 db-1                    | 2023-12-21 17:36:30.109 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2023-12-21 18:36:30 db-1                    | 2023-12-21 17:36:30.119 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2023-12-21 18:36:30 db-1                    | 2023-12-21 17:36:30.129 UTC [30] LOG:  database system was shut down at 2023-12-21 17:36:29 UTC
2023-12-21 18:36:30 db-1                    | 2023-12-21 17:36:30.138 UTC [1] LOG:  database system is ready to accept connections
2023-12-21 15:53:09 sim2-1                  | 2023-12-21 14:53:09 - send - ERROR - Simulation data file cannot be opened. Message: [Errno 2] No such file or directory: './data/Dataset.xlsx'
2023-12-21 15:53:09 sim2-1                  | Traceback (most recent call last):
2023-12-21 15:53:09 sim2-1                  |   File "/root/./src/send.py", line 137, in <module>
2023-12-21 15:53:09 sim2-1                  |     df = df_climate,
2023-12-21 15:53:09 sim2-1                  |          ^^^^^^^^^^
2023-12-21 15:53:09 sim2-1                  | NameError: name 'df_climate' is not defined
2023-12-21 18:36:31 sim2-1                  | 2023-12-21 17:36:31 - send - ERROR - Simulation data file cannot be opened. Message: [Errno 2] No such file or directory: './data/Dataset.xlsx'
2023-12-21 18:36:31 sim2-1                  | Traceback (most recent call last):
2023-12-21 18:36:31 sim2-1                  |   File "/root/./src/send.py", line 137, in <module>
2023-12-21 18:36:31 sim2-1                  |     df = df_climate,
2023-12-21 18:36:31 sim2-1                  |          ^^^^^^^^^^
2023-12-21 18:36:31 sim2-1                  | NameError: name 'df_climate' is not defined

```


When trying to CURL request: 
```
curl -X POST http://localhost:5000/api/v1/user -H "Content-Type: application/json" -d "{\"code\": \"Consumer1\",\"firstname\": \"John\",\"lastname\": \"Williams\",\"email\": \"somebody@gmail.com\",\"password\": \"password\",\"smartmeter\": {\"sn\": \"HG6789DS\"}}"
```

I get: 
```
curl: (7) Failed to connect to localhost port 5000 after 2233 ms: Couldn't connect to server
```