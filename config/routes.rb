Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :locations do
      resources :items
    end
    resources :items do
      resources :photos
      resources :documents
      resources :receipts
    end
  end
end
