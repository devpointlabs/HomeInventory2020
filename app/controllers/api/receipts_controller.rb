class Api::ReceiptsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_item
  before_action :set_receipt, only: [:show, :update, :destroy]
  
  def index
    receipts = @item.receipts.all
    render json: receipts
  end

  def show
    render json: @items.receipts.find(params[:id])
  end

  def create
    receipt = @item.receipts.new(receipt_params)
    file = params[:file]
    
    if file
      begin
        ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)

        receipt.image = cloud_image["secure_url"]
        
      rescue => e
        render json: { errors: e }, status: 422
        return
      end
    end
    if receipt.save
      render json: receipt
    else
      render json: { errors: receipt.errors.full_messages }, status: 422
    end
  end

  def update
    @receipt.update(receipt_params)
    render json: @receipt
  end

  def destroy
    @receipt.destroy
    render json: { message: 'Receipt deleted.' }
  end

 private

  def receipt_params
    params.require(:receipt).permit(:date, :receipt_num, :purchased_from, :price, :tax, :img, :item_id)
  end

  def set_item
    @item = Item.find(params[:item_id])
  end
  
  def set_receipt
   @receipt = @item.receipts.find(params[:id])
  end
end