class Api::HomesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_home, only: [:show, :edit, :destroy, :update]
  
  def index
    render json: current_user.homes.all
  end

  def create
    home = current_user.homes.new(home_params)
    file = params[:file]
    
    if file
      begin
        ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)

        home.image = cloud_image["secure_url"]
        
      rescue => e
        render json: { errors: e }, status: 422
        return
      end
    end
    if home.save
      render json: home
    else
      render json: { errors: home.errors.full_messages }, status: 422
    end
  end

  def update
    @home.update(home_params)
    # render json: @home
 

    file = params[:file]
    
    if file
      begin
        ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
        @home.image = cloud_image["secure_url"]
      rescue => e
        render json: { errors: e }, status: 422
        return
      end
    end
    if @home.save
      render json: @home
    else
      render json: { errors: @home.errors.full_messages }, status: 422
    end
  end

  def destroy
    @home.destroy
    render json: { message: 'Home deleted.' }
  end

private
  def home_params
    params.permit(:address, :zip_code, :square_footage, :lot_size, :purchase_date, :purchase_price, :image, )
  end

  def set_home
    @home = current_user.homes.find(params[:id])
  end
  
end
