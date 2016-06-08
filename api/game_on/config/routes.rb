Rails.application.routes.draw do
  root 'sessions#new'
  post '/login' => 'sessions#create'
  resources :players, only: [:new,:create, :show, :edit, :update] do
    resources :rsvps, only: [:index, :update, :destroy]
    resources :teams, except: [:delete] do
        patch 'join' => 'teams#join'
        patch 'drop' => 'teams#drop'
        get 'play' => 'teams#play'
      resources :games, only: [:index, :show, :new, :create] do
        post 'challenge' => 'games#challenge'
      end
    end
  end
end
