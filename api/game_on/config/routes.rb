Rails.application.routes.draw do
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'

  resources :players, only: [:show, :edit, :update] do
    resources :teams do
      member do
        get 'rsvp'
        post 'rsvp'
      end
      resources :games, only: [:index, :show, :new, :create, :update]
    end
  end
end
