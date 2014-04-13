Skynet::Application.routes.draw do
  resources :submissions, only: [:show, :new, :create]

  resources :dashboard, only: [:index]

  root "submissions#new"
end
