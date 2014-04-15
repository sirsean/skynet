root = "/home/skynet/skynet/current"
working_directory root
pid "/var/skynet/unicorn.pid"
unicorn_pid "/var/skynet/unicorn.pid"
set :unicorn_pid, "/var/skynet/unicorn.pid"
listen "/var/skynet/unicorn.sock"
stderr_path "/var/skynet/unicorn.log"
stdout_path "/var/skynet/unicorn.log"
