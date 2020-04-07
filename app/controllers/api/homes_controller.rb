class Api::HomesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_home, only: [:show, :edit, :destroy]
  
  def index
    render json: current_user.homes.all
    binding.pry
  end

  def create
    home = current_user.homes.new(home_params)
    if home.save
      render json: home
    else
      render json: home.errors, status: 422
    end
  end

  def update
    @home.update(home_params)
    render json: @home
  end

  def destroy
    @home.destroy
    render json: { message: 'Home deleted.' }
  end

private
  def home_params
    params.permit(:address, :zip_code, :square_footage, :lot_size, :purchase_date, :purchase_price, :image)
  end

  def set_home
    @home = current_user.homes.find(params[:id])
  end
  
end
