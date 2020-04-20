Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :locations
    resources :items do
      resources :photos
      resources :documents
      resources :receipts
    end
    resources :homes do
      resources :assessments
      resources :maintenances
      resources :policies
    end
  end
end
