class Api::PhotosController < ApplicationController
  before_action :authenticate_user!
  before_action :set_item 

  def index
    render json: @item.photos
  end 

  def show
    render json: @items.photos.find(params[:id])
  end

  def create
    photo = @item.photos.new(photo_params)
    if photo.save
      render json: photo
    else
      render json: {message: "ooopsie"}
    end
  end

  def update
    if @photo.update(photo_params)
      render json: @photo
    else
      render json:{message: 'ooopsie'}
    end
  end

  def destroy
    @photo.destroy
  end

  private 

  def photos_params
    params.require(:photos).permit(:name, :file)
  end

  def set_item
    @item = Item.find(params[:item_id])
  end
end
