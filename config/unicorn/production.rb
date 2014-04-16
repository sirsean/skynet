root = "/home/skynet/skynet/current"
working_directory root
pid "/var/skynet/unicorn.pid"
listen "/var/skynet/unicorn.sock"
stderr_path "/var/skynet/unicorn.log"
stdout_path "/var/skynet/unicorn.log"
worker_processes 2
timeout 30

before_exec do |_|
  ENV["TESTME5"] = 2
end
