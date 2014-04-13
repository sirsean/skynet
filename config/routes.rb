Skynet::Application.routes.draw do
  resources :submissions, only: [:show, :new, :create]

  root "submissions#new"
end
