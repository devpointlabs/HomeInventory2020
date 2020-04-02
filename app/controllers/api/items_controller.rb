class Api::ItemsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_location
  before_action :set_item, only: [:show, :edit, :destroy]

  def index
    items = @location.items.all
    render json: items
  end

  def show
    item = @location.items.find(params[:id])
    render json: item
  end

  def create
    item = @location.items.new(item_params)
    if item.save
      render json: item
    else
      render json: item.errors, status: 422
    end
  end
 
  def update
    @item.update(item_params)
    render json: @item
  end

  def destroy
    @item.destroy
    render json: { message: 'Item deleted.' }
  end

private

  def item_params
    params.require(:items).permit(:name, :make, :model, :serial_num, :category, :collection, :condition, :heir, :purchase_date, :quantity, :value, :tags)
  end

  def set_location
    @location = Location.find(params[:location_id])
  end
  def set_item
    @item = @location.items.find(params[:id])
  end
end
