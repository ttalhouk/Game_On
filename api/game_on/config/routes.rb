Rails.application.routes.draw do
  root 'sessions#new'
  post '/login' => 'sessions#create'
  resources :players, only: [:new,:create, :show, :edit, :update] do
    resources :teams, except: [:delete] do
      resources :games, only: [:index, :show, :new, :create, :update] do
        get 'rsvp' => 'rsvp#show'
        post 'rsvp' => 'rsvp#create'
        patch 'rsvp' => 'rsvp#update'
      end
    end
  end
end
