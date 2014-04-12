# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary
# server in each group is considered to be the first
# unless any hosts have the primary property set.
# Don't declare `role :all`, it's a meta role
role :app, %w{skynet@skynet.feedhammer.com}
role :web, %w{skynet@skynet.feedhammer.com}
role :db,  %w{skynet@skynet.feedhammer.com}

# other stuff I think I need to set
#set :application, "skynet"
#set :user, "skynet"
set :deploy_to, "/home/skynet/skynet"

set :repository, "git@github.com:sirsean/skynet.git"
set :branch, "master"
set :scm, :git
set :deploy_via, :remote_cache

set :ssh_options, { :forward_agent => true }

# Extended Server Syntax
# ======================
# This can be used to drop a more detailed server
# definition into the server list. The second argument
# something that quacks like a hash can be used to set
# extended properties on the server.
server 'skynet.feedhammer.com', user: 'skynet', roles: %w{web app db}, primary: true

# you can set custom ssh options
# it's possible to pass any option but you need to keep in mind that net/ssh understand limited list of options
# you can see them in [net/ssh documentation](http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start)
# set it globally
#  set :ssh_options, {
#    keys: %w(/home/rlisowski/.ssh/id_rsa),
#    forward_agent: false,
#    auth_methods: %w(password)
#  }
# and/or per server
# server 'example.com',
#   user: 'user_name',
#   roles: %w{web app},
#   ssh_options: {
#     user: 'user_name', # overrides user setting above
#     keys: %w(/home/user_name/.ssh/id_rsa),
#     forward_agent: false,
#     auth_methods: %w(publickey password)
#     # password: 'please use keys'
#   }
# setting per server overrides global ssh_options