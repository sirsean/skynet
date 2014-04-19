Skynet::Application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  resources :submissions, only: [:show, :new, :create, :destroy]

  resources :dashboard, only: [:index]

  get "personal/:user_id", to: "personal#show", as: "personal"
  get "nearby", to: "nearby#index", as: "nearby_index"
  get "nearby/nearby", to: "nearby#nearby"

  root "submissions#new"
end
