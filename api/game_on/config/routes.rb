Rails.application.routes.draw do
  root 'sessions#new'
  post '/login' => 'sessions#create'
  resources :players, only: [:new,:create, :show, :edit, :update] do
    resources :teams, except: [:delete] do
      resources :games, only: [:index, :show, :new, :create] do
        get 'rsvp' => 'rsvp#index'
        patch 'rsvp' => 'rsvp#update'
      end
    end
  end
end
