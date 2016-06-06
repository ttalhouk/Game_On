Rails.application.routes.draw do
  root 'sessions#new'
  post '/login' => 'sessions#create'
  resources :players, only: [:new,:create, :show, :edit, :update] do
    resources :teams, except: [:delete] do
        patch 'join' => 'teams#join'
        patch 'drop' => 'teams#drop'
      resources :games, only: [:index, :show, :new, :create] do
        get 'rsvp' => 'rsvps#index'
        patch 'rsvp' => 'rsvps#update'
        delete 'rsvp' => 'rsvps#destroy'
      end
    end
  end
end
