Skynet::Application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  resources :submissions, only: [:show, :new, :create]

  resources :dashboard, only: [:index]

  root "submissions#new"
end
