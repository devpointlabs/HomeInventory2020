class Api::PhotosController < ApplicationController
  before_action :authenticate_user!
  before_action :set_item 

  def index
    render json: @item.photos.all
  end 

  def show
    render json: @items.photos.find(params[:id])
  end

  def create
    file = params[:file]
    if file
      begin
        ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
        #update call on photo
        photo = @item.photos.create(file: cloud_image['secure_url'], name: file.original_filename) 

        render json: photo
      rescue => e
        render json: { errors: e }, status: 422
      end
    end

    # photo = @item.photos.new(photo_params)
    # if photo.save
    #   render json: photo
    # else
    #   render json: {message: "ooopsie"}
    # end
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
