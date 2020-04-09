class Api::ItemsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_item, only: [:show, :edit, :destroy]

  def index
    items = current_user.items.all
    render json: items
  end

  def show
    item = current_user.items.find(params[:id])
    render json: item
  end

  def create
    item = current_user.items.new(item_params)
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
    params.permit(:name, :make, :model, :serial_num, :category, :collection, :condition, :purchase_date, :quantity, :value, :tags, :location_id)
  end

  def set_item
    @item = current_user.items.find(params[:id])
  end
end
