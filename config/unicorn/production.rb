root = "/home/skynet/skynet/current"
working_directory root
pid "/var/skynet/unicorn.pid"
listen "/var/skynet/unicorn.sock"
worker_processes 2
timeout 30
stderr_path "/var/skynet/unicorn.log"
stdout_path "/var/skynet/unicorn.log"
