class Api::LocationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_location, only: [:show, :edit, :destroy]
  
  def index
    render json: current_user.locations.all
  end

  def create
    location = current_user.locations.new(location_params)
    if location.save
      render json: location
    else
      render json: location.errors, status: 422
    end
  end

  def update
    @location.update(location_params)
    render json: @location
  end

  def destroy
    @location.destroy
    render json: { message: 'Location deleted.' }
  end

private
  def location_params
    params.require(:locations).permit(:name, :square_footage, :description)
  end
  def set_location
    @location = current_user.locations.find(params[:id])
  end

end
