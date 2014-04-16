root = "/home/skynet/skynet_staging/current"
working_directory root
pid "/var/skynet_staging/unicorn.pid"
listen "/var/skynet_staging/unicorn.sock"
stderr_path "/var/skynet_staging/unicorn.log"
stdout_path "/var/skynet_staging/unicorn.log"
worker_processes 2
timeout 30

before_exec do |_|
  ENV["TESTME4"] = 1
end
